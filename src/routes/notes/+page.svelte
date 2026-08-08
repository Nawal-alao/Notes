<script>
  import { onMount } from 'svelte';
  import FolderList from './FolderList.svelte';
  import NoteCard from './NoteCard.svelte';
  import Editor from './Editor.svelte';
  import CreateNoteButton from '$lib/CreateNoteButton.svelte';
  import { fetchNotes, makeEncryptedPayload, decryptPayload, upsertNote, deleteNote, subscribeToNotes } from '$lib/notes';
  import { encryptionStore } from '$lib/stores/encryption';
  import { notify } from '$lib/stores/toast';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import { crossfade, fade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { spring } from 'svelte/motion';
  import { supabase } from '$lib/supabase';
  import {
    Search, Lock, ShieldCheck, FileText, Sparkles, X, 
    LogOut, FolderOpen, AlertCircle, KeyRound, ChevronsLeft, ChevronsRight
  } from 'lucide-svelte';

  const [send, receive] = crossfade({
    duration: d => Math.max(200, d * 0.6),
    fallback(node, params) {
      return { duration: 200, css: t => `opacity:${t}` };
    }
  });

  const btnScale = spring(1, { stiffness: 0.25, damping: 0.5 });

  let notes = [];
  let folders = [];
  let selectedFolder = 'all';
  let selectedNoteId = null;
  let search = '';
  let searchInputEl;
  let notesPanelOpen = true;
  let createdTags = new Set();

  async function load() {
    const session = await fetchNotes();
    const key = get(encryptionStore);
    if (!key) return goto('unlock');

    // Decrypt titles and previews for list display
    notes = await Promise.all((session || []).map(async (n) => {
      const titleIV = n.title_iv || n.content_iv;
      let titlePreview = '';
      let preview = '';

      if (n.title && titleIV) {
        try {
          const decryptedTitle = String(await decryptPayload(key, n.title, titleIV) || '').trim();
          if (decryptedTitle) titlePreview = decryptedTitle;
        } catch (err) {
          titlePreview = '';
        }
      }

      const contentIV = n.content_iv || n.title_iv;
      if (n.encrypted_content && contentIV) {
        try {
          const decryptedContent = await decryptPayload(key, n.encrypted_content, contentIV);
          preview = generatePreviewSnippet(decryptedContent || '');
          if (!titlePreview) titlePreview = generateTitleFallback('', decryptedContent || '');
        } catch (err) {
          preview = generatePreviewSnippet(n.preview || '');
          if (!titlePreview) titlePreview = generateTitleFallback('', n.preview || '');
        }
      } else {
        const content = n.preview || '';
        preview = generatePreviewSnippet(content);
        if (!titlePreview) titlePreview = generateTitleFallback('', content);
      }

      return { ...n, titlePreview, preview };
    }));
    buildFolders();
  }

  function stripMarkdownSyntax(text) {
    if (!text) return '';
    let result = String(text);
    // If HTML was accidentally passed in (from other parts of the app), strip tags first
    result = result.replace(/<[^>]*>/g, ' ');
    result = result.replace(/```[\s\S]*?```/g, ' ');
    result = result.replace(/`([^`]+)`/g, '$1');
    result = result.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1');
    result = result.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
    result = result.replace(/^(#{1,6})\s+/gm, '');
    result = result.replace(/^\s*[-*+]\s+/gm, '');
    result = result.replace(/^\s*\d+\.\s+/gm, '');
    result = result.replace(/^\s*>\s?/gm, '');
    result = result.replace(/~~(.*?)~~/g, '$1');
    result = result.replace(/(\*\*|__)(.*?)\1/g, '$2');
    result = result.replace(/(\*|_)(.*?)\1/g, '$2');
    result = result.replace(/\|/g, ' ');
    result = result.replace(/[-=]{2,}\s*$/gm, '');
    result = result.replace(/\s+/g, ' ');
    result = result.trim();
    return result;
  }

  function generateTitleFallback(title, body) {
    const normalized = String(title || '').trim();
    if (normalized) return normalized;
    if (!body) return 'Sans titre';

    const lines = body.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    for (const line of lines) {
      const heading = line.match(/^(#{1,6})\s+(.*)$/);
      if (heading) {
        return stripMarkdownSyntax(heading[2]).trim() || 'Sans titre';
      }
    }

    const firstLine = stripMarkdownSyntax(lines[0] || '').trim();
    if (!firstLine) return 'Sans titre';
    return firstLine.length > 60 ? firstLine.slice(0, 60).trimEnd() + '…' : firstLine;
  }

  function generatePreviewSnippet(body) {
    if (!body) return 'Note vide…';
    const cleaned = stripMarkdownSyntax(body);
    const excerpt = cleaned.length > 180 ? cleaned.slice(0, 180).trimEnd() + '…' : cleaned;
    return excerpt;
  }

  function buildFolders() {
    const map = new Map();
    map.set('all', { id: 'all', name: 'Toutes les notes', count: notes.length, description: '' });
    map.set('uncat', { id: 'uncat', name: 'Non classées', count: notes.filter(n => !n.tags || n.tags.length === 0).length, description: '' });
    
    notes.forEach(n => {
      (n.tags || []).forEach(t => {
        if (!map.has(t)) map.set(t, { id: t, name: t, count: 0, description: '' });
        map.get(t).count += 1;
      });
    });

    createdTags.forEach((tag) => {
      if (!map.has(tag)) {
        map.set(tag, { id: tag, name: tag, count: 0, description: '' });
      }
    });

    folders = Array.from(map.values());
  }

  onMount(async () => {
    const key = get(encryptionStore);
    if (!key) return goto('unlock');
    await load();

    const unsubscribe = subscribeToNotes((payload) => {
      const ev = payload.eventType || payload.event || payload.type;
      const newRow = payload.new || payload.record || payload;
      const oldRow = payload.old || payload.previous;
      if (!newRow && !oldRow) return;

      (async () => {
        const key = get(encryptionStore);
        if (!key) return;
        try {
          if (ev === 'INSERT' || payload.type === 'INSERT') {
            try {
              const titleIV = newRow.title_iv;
              let title = 'Sans titre';
              if (newRow.title && titleIV) {
                try {
                  title = await decryptPayload(key, newRow.title, titleIV) || 'Sans titre';
                } catch {
                  title = 'Sans titre';
                }
              }

              let content = '';
              if (newRow.encrypted_content && newRow.content_iv) {
                try {
                  content = await decryptPayload(key, newRow.encrypted_content, newRow.content_iv);
                } catch {
                  content = newRow.preview || '';
                }
              } else {
                content = newRow.preview || '';
              }

              const decrypted = {
                ...newRow,
                titlePreview: generateTitleFallback(title, content || ''),
                preview: generatePreviewSnippet(content || '')
              };
              notes = [decrypted, ...notes.filter(n => n.id !== newRow.id)];
            } catch (e) {
              notes = [newRow, ...notes.filter(n => n.id !== newRow.id)];
            }
          } else if (ev === 'UPDATE' || payload.type === 'UPDATE') {
            try {
              const titleIV = newRow.title_iv || newRow.content_iv;
              let title = 'Sans titre';
              if (newRow.title && titleIV) {
                try {
                  title = await decryptPayload(key, newRow.title, titleIV) || 'Sans titre';
                } catch {
                  title = 'Sans titre';
                }
              }

              let content = '';
              if (newRow.encrypted_content && newRow.content_iv) {
                try {
                  content = await decryptPayload(key, newRow.encrypted_content, newRow.content_iv);
                } catch {
                  content = newRow.preview || '';
                }
              } else {
                content = newRow.preview || '';
              }

              const decrypted = {
                ...newRow,
                titlePreview: generateTitleFallback(title, content || ''),
                preview: generatePreviewSnippet(content || '')
              };
              notes = notes.map(n => n.id === newRow.id ? decrypted : n);
            } catch (e) {
              notes = notes.map(n => n.id === newRow.id ? newRow : n);
            }
          } else if (ev === 'DELETE' || payload.type === 'DELETE') {
            notes = notes.filter(n => n.id !== oldRow.id);
          }
        } catch (e) {
          console.error('Realtime note handling error', e);
        }
        buildFolders();
      })();
    });

    // Keyboard shortcut handler (Ctrl+K or Cmd+K to focus search)
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputEl?.focus();
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === ',' || e.key === '<')) {
        e.preventDefault();
        toggleNotesPanel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const cleanup = () => {
      if (unsubscribe) unsubscribe();
      window.removeEventListener('keydown', handleKeyDown);
    };
    return cleanup;
  });

  function selectFolder(id) { selectedFolder = id; }
  function toggleNotesPanel() { notesPanelOpen = !notesPanelOpen; }

  async function handleLockVault() {
    encryptionStore.set(null);
    goto('unlock');
  }

  async function createNote() {
    console.log('clic détecté');
    const key = get(encryptionStore);
    if (!key) return goto('unlock');
    const titleEnc = await makeEncryptedPayload(key, '');
    const contentEnc = await makeEncryptedPayload(key, '');
    
    // Assign tag if currently inside a tag view
    const initialTags = (selectedFolder !== 'all' && selectedFolder !== 'uncat') ? [selectedFolder] : [];

    const newNote = await upsertNote({
      title: titleEnc.ciphertextBase64,
      title_iv: titleEnc.ivBase64,
      encrypted_content: contentEnc.ciphertextBase64,
      content_iv: contentEnc.ivBase64,
      tags: initialTags
    });
    await load();
    selectedNoteId = newNote.id;
  }

  function bounceCreate() {
    btnScale.set(1.15);
    createNote();
    setTimeout(() => btnScale.set(1), 250);
  }

  function onNoteOpen(id) { selectedNoteId = id; }

  function onNoteSaved() { load(); }

  async function onDelete(id) {
    await deleteNote(id);
    await load();
    if (selectedNoteId === id) selectedNoteId = null;
  }

  async function handleCreateTag(name) {
    if (!name || name === 'all' || name === 'uncat') return;
    createdTags.add(name);
    selectedFolder = name;
    buildFolders();
  }

  async function onDropEvent(e) {
    const { noteId, folderId } = e.detail;
    const n = notes.find(x => x.id === noteId);
    if (!n) return;
    const tags = folderId === 'uncat' ? [] : (folderId === 'all' ? n.tags || [] : [folderId]);
    try {
      await upsertNote({ id: n.id, tags });
      n.tags = tags;
      buildFolders();
    } catch (err) {
      console.error('Failed to move note', err);
      await load();
    }
  }

  async function onExport(e) {
    const { id, type } = e.detail;
    const n = notes.find(x => x.id === id);
    if (!n) return;
    const key = get(encryptionStore);
    if (!key) return goto('unlock');
    try {
      const title = await decryptPayload(key, n.title, n.title_iv || n.content_iv);
      const body = await decryptPayload(key, n.encrypted_content, n.content_iv || n.title_iv);
      if (type === 'txt') {
        const blob = new Blob([title + '\n\n' + body], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = (title || 'note') + '.txt'; a.click(); URL.revokeObjectURL(url);
      } else if (type === 'pdf') {
        const w = window.open('', '_blank');
        w.document.write(`<html><head><title>${title}</title><style>body{font-family:system-ui,sans-serif;color:#1e293b;padding:40px}</style></head><body><h1>${title}</h1><pre style="white-space:pre-wrap">${escapeHtml(body)}</pre></body></html>`);
        w.document.close();
        w.focus();
        w.print();
      }
    } catch (err) {
      console.error(err);
      notify({ message: 'Impossible d\'exporter : déchiffrement échoué', type: 'error' });
    }
  }

  function escapeHtml(s) { return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  $: filteredNotesList = (() => {
    let list = notes.slice().sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    if (selectedFolder === 'uncat') list = list.filter(n => !n.tags || n.tags.length === 0);
    else if (selectedFolder !== 'all') list = list.filter(n => (n.tags || []).includes(selectedFolder));
    if (search && search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(n => ((n.titlePreview || '')).toLowerCase().includes(q) || (n.preview || '').toLowerCase().includes(q));
    }
    return list;
  })();
</script>

<svelte:head>
  <title>Private Notes · Workspace Chiffré</title>
</svelte:head>

<div class="relative flex flex-col h-screen overflow-hidden p-4 md:p-6 gap-4 page-shell">
  <div class="pointer-events-none absolute inset-0 page-bg-surface"></div>

  <!-- Top Navigation Header -->
  <header class="flex items-center justify-between px-6 py-3.5 glass-panel rounded-lg border border-white/10 shadow-2xl flex-shrink-0">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-md bg-transparent border border-white/6 flex items-center justify-center text-slate-300 font-bold">
        <ShieldCheck class="w-6 h-6 icon-muted" />
      </div>
      <div>
        <h1 class="text-base font-bold text-white tracking-tight leading-tight flex items-center gap-2">
          Private Notes
          <span class="px-2 py-0.5 rounded-full bg-white/[0.03] text-slate-300 text-[10px] font-semibold tracking-wider border border-white/[0.06]">v2.0 AES-256</span>
        </h1>
        <p class="text-xs text-slate-400">Espace de travail chiffré de bout en bout</p>
      </div>
    </div>

    <!-- Search Bar & Actions -->
    <div class="flex items-center gap-3">
      <div class="relative w-64 md:w-80">
        <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          bind:this={searchInputEl}
          bind:value={search}
          placeholder="Rechercher des notes (⌘K)…"
          class="w-full pl-10 pr-9 py-2.5 rounded-md glass-input text-slate-100 placeholder-slate-500 text-xs outline-none transition"
        />
        {#if search}
          <button on:click={() => search = ''} class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded-md">
            <X class="w-3.5 h-3.5" />
          </button>
        {/if}
      </div>

      <CreateNoteButton on:click={bounceCreate} style="transform: scale({$btnScale});" />

      <button
        on:click={handleLockVault}
        class="p-2.5 rounded-md glass-input text-slate-400 hover:text-amber-400 hover:border-amber-400/40 transition"
        title="Verrouiller le coffre-fort"
      >
        <Lock class="w-4 h-4" />
      </button>
    </div>
  </header>

  <!-- Workspace Main Layout Grid (Sidebar + Notes panel + Centered editor) -->
  <div class="flex-1 min-h-0 flex gap-4 overflow-hidden">

    <!-- Sidebar: Folders & Tags (collapsible) -->
    <FolderList
      {folders}
      selected={selectedFolder}
      notesPanelOpen={notesPanelOpen}
      on:select={(e) => selectFolder(e.detail)}
      on:create={(e) => handleCreateTag(e.detail)}
      on:drop={(e) => onDropEvent(e.detail)}
      on:toggle-notes-panel={toggleNotesPanel}
    />

    <!-- Notes List Panel (compact, fixed width) -->
    <aside class={`hidden md:block flex-shrink-0 overflow-hidden transition-all duration-300 ${notesPanelOpen ? 'w-72' : 'w-0'}`}>
      <section class={`glass-panel rounded-lg p-3 border border-white/10 shadow-2xl h-full flex flex-col overflow-hidden transition-all duration-300 ${notesPanelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div class="flex items-center justify-between px-2 mb-3">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FileText class="w-3.5 h-3.5 text-slate-400" />
              <span>Notes ({filteredNotesList.length})</span>
            </span>
            <button
              on:click={toggleNotesPanel}
              class="p-1.5 rounded-md text-slate-400 hover:text-white transition"
              title={notesPanelOpen ? 'Masquer le panneau notes (Ctrl+,)' : 'Afficher le panneau notes (Ctrl+,)'}
            >
              {#if notesPanelOpen}
                <ChevronsLeft class="w-4 h-4" />
              {:else}
                <ChevronsRight class="w-4 h-4" />
              {/if}
            </button>
          </div>

        <div class="flex-1 overflow-y-auto pr-1 space-y-2.5 h-[calc(100%-44px)]">
            {#if filteredNotesList.length > 0}
              {#each filteredNotesList as note, i (note.id)}
                <div animate:flip={{ duration: 200 }}>
                  <NoteCard
                    {note}
                    index={i}
                    isSelected={selectedNoteId === note.id}
                    on:open={(e) => onNoteOpen(e.detail)}
                    on:delete={(e) => onDelete(e.detail)}
                    on:export={(e) => onExport(e)}
                  />
                </div>
              {/each}
            {:else}
                <div class="h-full flex flex-col items-center justify-center text-center p-4 text-slate-500 space-y-3 empty-state-card">
                  <div class="empty-illustration">
                    <FolderOpen class="w-10 h-10 stroke-1 text-slate-500 icon-muted" />
                  </div>
                  <div class="space-y-1">
                    <p class="text-sm font-semibold text-slate-400">Aucune note trouvée</p>
                    <p class="text-xs text-slate-500">Créez votre première note chiffrée pour commencer.</p>
                  </div>
                  <CreateNoteButton on:click={bounceCreate} className="px-3 py-2 text-xs font-semibold" />
                </div>
            {/if}
          </div>
      </section>
    </aside>

    <!-- Editor area: centered, comfortable reading width -->
    <main class="flex-1 min-w-0 h-full overflow-auto">
      <div class="flex justify-center w-full h-full">
        <div class="w-full max-w-[900px] h-full">
          {#if selectedNoteId}
            {#key selectedNoteId}
              <div in:receive|local out:send|local class="h-full">
                <Editor noteId={selectedNoteId} onSaved={() => onNoteSaved()} />
              </div>
            {/key}
          {:else}
            <div class="h-full glass-panel rounded-lg p-8 border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center space-y-4 empty-state-card">
              <div class="empty-illustration">
                <Sparkles class="w-8 h-8 text-slate-200 icon-muted" />
              </div>
              <div class="max-w-sm space-y-2">
                <h3 class="text-xl font-bold text-white">Aucune note sélectionnée</h3>
                <p class="text-xs text-slate-400 leading-relaxed">
                  Sélectionnez une note dans la liste pour l'éditer, ou créez un nouveau document chiffré en un clic.
                </p>
              </div>
              <CreateNoteButton on:click={bounceCreate} className="px-6 py-3 text-xs font-bold" />
            </div>
          {/if}
        </div>
      </div>
    </main>

  </div>
</div>


