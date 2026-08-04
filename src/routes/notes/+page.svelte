<script>
  import { onMount } from 'svelte';
  import FolderList from './FolderList.svelte';
  import NoteCard from './NoteCard.svelte';
  import Editor from './Editor.svelte';
  import HistoryPanel from './HistoryPanel.svelte';
  import { fetchNotes, makeEncryptedPayload, decryptPayload, upsertNote, deleteNote, subscribeToNotes } from '$lib/notes';
  import { encryptionStore, base64ToArrayBuffer } from '$lib/stores/encryption';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import { crossfade } from 'svelte/transition';

  const [send, receive] = crossfade({
    duration: d => Math.max(200, d * 0.6),
    fallback(node, params) {
      return { duration: 200, css: t => `opacity:${t}` };
    }
  });

  let notes = [];
  let folders = [];
  let selectedFolder = 'all';
  let selectedNoteId = null;
  let search = '';

  async function load() {
    const session = await fetchNotes();
    notes = session;
    buildFolders();
  }

  function buildFolders() {
    const map = new Map();
    map.set('all', { id: 'all', name: 'Toutes les notes', count: notes.length, description: '' });
    map.set('uncat', { id: 'uncat', name: 'Non classées', count: notes.filter(n => !n.tags || n.tags.length===0).length, description: '' });
    // collect per-tag first tag as folder
    notes.forEach(n => {
      (n.tags || []).forEach(t => {
        if (!map.has(t)) map.set(t, { id: t, name: t, count: 0, description: '' });
        map.get(t).count += 1;
      });
    });
    folders = Array.from(map.values());
  }

  onMount(async () => {
    const key = get(encryptionStore);
    if (!key) return goto('/unlock');
    await load();
    // subscribe to realtime changes
    const unsubscribe = subscribeToNotes((payload) => {
      const ev = payload.eventType || payload.event || payload.type;
      const newRow = payload.new || payload.record || payload;
      const oldRow = payload.old || payload.previous;
      if (!newRow && !oldRow) return;

      if (ev === 'INSERT' || ev === 'INSERT' || payload.type === 'INSERT') {
        // prepend
        notes = [newRow, ...notes.filter(n => n.id !== newRow.id)];
      } else if (ev === 'UPDATE' || payload.type === 'UPDATE') {
        notes = notes.map(n => n.id === newRow.id ? newRow : n);
      } else if (ev === 'DELETE' || payload.type === 'DELETE') {
        notes = notes.filter(n => n.id !== oldRow.id);
      }
      buildFolders();
    });

    // cleanup on destroy
    const cleanup = () => { if (unsubscribe) unsubscribe(); }
    // ensure we unsubscribe when leaving
    window.addEventListener('beforeunload', cleanup);
  });

  function selectFolder(id) { selectedFolder = id; }

  async function createNote() {
    const key = get(encryptionStore);
    if (!key) return goto('/unlock');
    const titleEnc = await makeEncryptedPayload(key, '');
    const contentEnc = await makeEncryptedPayload(key, '');
    const newNote = await upsertNote({ title: titleEnc.ciphertextBase64, title_iv: titleEnc.ivBase64, encrypted_content: contentEnc.ciphertextBase64, content_iv: contentEnc.ivBase64, tags: [] });
    await load();
    selectedNoteId = newNote.id;
  }

  let bouncing = false;
  function bounceCreate() {
    bouncing = true;
    createNote();
    setTimeout(() => bouncing = false, 500);
  }

  function onNoteOpen(id) { selectedNoteId = id; }

  function onNoteSaved(saved) { load(); }

  async function onDelete(id) { await deleteNote(id); await load(); if (selectedNoteId===id) selectedNoteId = null; }

  async function onDropEvent(e) {
    const { noteId, folderId } = e.detail;
    const n = notes.find(x => x.id === noteId);
    if (!n) return;
    const tags = folderId === 'uncat' ? [] : (folderId === 'all' ? n.tags || [] : [folderId]);
    try {
      await upsertNote({ id: n.id, tags });
      // optimistic update
      n.tags = tags;
      buildFolders();
    } catch (err) {
      console.error('failed to move note', err);
      await load();
    }
  }

  async function onExport(e) {
    const { id, type } = e.detail;
    const n = notes.find(x => x.id === id);
    if (!n) return;
    const key = get(encryptionStore);
    if (!key) return goto('/unlock');
    try {
      const title = await decryptPayload(key, n.title, n.title_iv || n.content_iv);
      const body = await decryptPayload(key, n.encrypted_content, n.content_iv);
      if (type === 'txt') {
        const blob = new Blob([title + '\n\n' + body], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = (title || 'note') + '.txt'; a.click(); URL.revokeObjectURL(url);
      } else if (type === 'pdf') {
        // Simple print-to-PDF flow
        const w = window.open('', '_blank');
        w.document.write(`<html><head><title>${title}</title><style>body{font-family:Inter,system-ui,Arial;color:#e6eef8;background:#fff;padding:40px}</style></head><body><h1>${title}</h1><pre>${escapeHtml(body)}</pre></body></html>`);
        w.document.close();
        w.focus();
        w.print();
      }
    } catch (err) {
      console.error(err);
      alert('Impossible d\'exporter : déchiffrement échoué');
    }
  }

  function escapeHtml(s) { return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function filteredNotes() {
    let list = notes.slice().sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at));
    if (selectedFolder === 'uncat') list = list.filter(n => !n.tags || n.tags.length===0);
    else if (selectedFolder !== 'all') list = list.filter(n => (n.tags||[]).includes(selectedFolder));
    if (search && search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(n => (n.title || '').toLowerCase().includes(q) || (n.preview || '').toLowerCase().includes(q));
    }
    return list;
  }
</script>

<div class="min-h-screen p-6 bg-slate-950 text-slate-100">
  <div class="flex gap-6">
    <FolderList {folders} selected={selectedFolder} on:select={(e)=>selectFolder(e.detail)} on:drop={(e)=>onDropEvent(e.detail)} />

    <div class="flex-1">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
            <button class="rounded-full bg-fuchsia-500 px-4 py-2 transform transition-transform" on:click={bounceCreate}>Nouvelle note</button>
            <input placeholder="Rechercher" bind:value={search} class="px-3 py-2 rounded bg-slate-900/40" />
          </div>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-1 space-y-2">
              {#each filteredNotes() as note, i}
            <NoteCard {note} index={i} on:open={(e)=>onNoteOpen(e.detail)} on:delete={(e)=>onDelete(e.detail)} on:export={(e)=>onExport(e)} />
              {/each}
        </div>

        <div class="col-span-2">
              {#if selectedNoteId}
                {#key selectedNoteId}
                  <div in:receive|local out:send|local class="transition-all">
                    <Editor noteId={selectedNoteId} onSaved={(e)=>onNoteSaved(e.detail)} />
                  </div>
                {/key}
              {:else}
                <div class="p-8 bg-slate-900 rounded">Sélectionnez une note</div>
              {/if}
        </div>
      </div>
    </div>
  </div>
</div>
<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase';
  import { encryptionStore } from '$lib/stores/encryption';

  let ready = false;

  onMount(async () => {
    const { data } = await supabase.auth.getSession();
    const key = await new Promise((resolve) => {
      const unsub = encryptionStore.subscribe((value) => {
        resolve(value);
        unsub();
      });
    });

    if (!data.session || !key) {
      goto('/unlock');
      return;
    }

    ready = true;
  });
</script>

<svelte:head>
  <title>Notes · Private Notes</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center px-4">
  <div class="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/30">
    <h1 class="text-2xl font-semibold">Votre espace de notes</h1>
    <p class="mt-3 text-sm text-slate-400">L’éditeur et la synchronisation arrivent dans la prochaine étape. Le flux d’authentification et de déverrouillage est prêt.</p>
  </div>
</div>
