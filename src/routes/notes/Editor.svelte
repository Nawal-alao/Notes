<script>
  import { onMount } from 'svelte';
  import { writable, get } from 'svelte/store';
  import { encryptionStore, arrayBufferToBase64, base64ToArrayBuffer } from '$lib/stores/encryption';
  import { makeEncryptedPayload, decryptPayload, upsertNote, fetchNoteById } from '$lib/notes';
  import { goto } from '$app/navigation';

  function debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  export let noteId = null;
  export let onSaved = () => {};

  let title = '';
  let body = '';
  let status = 'Chargement...';
  let saving = false;
  let currentNote = null;

  async function loadNote(id) {
    const key = get(encryptionStore);
    if (!key) return goto('/unlock');
    const row = await fetchNoteById(id);
    currentNote = row;
    try {
      // title may be plaintext or base64 encrypted
      let t = row.title || '';
      try {
        // try decrypt if base64-like
        title = await decryptPayload(key, row.title, row.title_iv || row.content_iv);
      } catch (e) {
        title = t;
      }

      body = await decryptPayload(key, row.encrypted_content, row.content_iv);
      status = 'Enregistré';
    } catch (e) {
      status = 'Erreur de déchiffrement';
    }
  }

  // autosave
  const save = debounce(async () => {
    const key = get(encryptionStore);
    if (!key) return goto('/unlock');
    saving = true; status = 'Enregistrement…';

    try {
      // preserve previous encrypted blob in history if present
      const prev = currentNote || {};
      const titleEnc = await makeEncryptedPayload(key, title);
      const contentEnc = await makeEncryptedPayload(key, body);

      // build history: insert previous encrypted payload
      let history = prev.history || [];
      try {
        // prepend previous
        if (prev.encrypted_content) {
          history = [{ encrypted_content: prev.encrypted_content, content_iv: prev.content_iv, updated_at: prev.updated_at }, ...history].slice(0,20);
        }
      } catch (e) {}

      const payload = {
        id: currentNote?.id,
        title: titleEnc.ciphertextBase64,
        // optional: store a title_iv if needed
        title_iv: titleEnc.ivBase64,
        encrypted_content: contentEnc.ciphertextBase64,
        content_iv: contentEnc.ivBase64,
        tags: currentNote?.tags || [],
        history
      };

      const saved = await upsertNote(payload);
      currentNote = saved;
      status = 'Enregistré';
      onSaved(saved);
    } catch (e) {
      status = 'Échec — réessai';
    } finally {
      saving = false;
    }
  }, 700);

  $: if (noteId) loadNote(noteId);

  function applyFormat(signature) {
    // simple markdown insertion
    const ta = document.getElementById('editor');
    if (!ta) return;
    const start = ta.selectionStart, end = ta.selectionEnd;
    const before = body.slice(0, start);
    const sel = body.slice(start, end);
    const after = body.slice(end);
    body = before + signature.start + sel + signature.end + after;
    // move caret
  }

  function exportTxt() {
    const blob = new Blob([title + '\n\n' + body], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = (title || 'note') + '.txt'; a.click();
    URL.revokeObjectURL(url);
  }

</script>

<div class="flex flex-col h-full">
  <div class="mb-3">
    <input class="w-full text-2xl bg-transparent border-0 outline-none text-slate-100" bind:value={title} placeholder="Titre" on:input={() => save()} />
    <div class="flex items-center gap-3 mt-2">
      <div class="toolbar flex gap-2">
        <button on:click={() => applyFormat({ start: '**', end: '**' })}><strong>B</strong></button>
        <button on:click={() => applyFormat({ start: '*', end: '*' })}><em>I</em></button>
        <button on:click={() => applyFormat({ start: '# ', end: '' })}>H1</button>
        <button on:click={() => applyFormat({ start: '- ', end: '' })}>•</button>
      </div>
      <div class="ml-auto text-sm text-slate-400">{status}</div>
    </div>
  </div>

  <div class="flex-1 grid grid-cols-2 gap-4">
    <textarea id="editor" bind:value={body} class="p-4 bg-slate-950 rounded-lg text-slate-200 resize-none" on:input={() => save()}></textarea>

    <div class="p-4 bg-slate-900 rounded-lg text-slate-200 overflow-auto">
      <div>{@html simpleMarkdown(body)}</div>
    </div>
  </div>

  <div class="mt-3 flex justify-end gap-2">
    <button class="btn" on:click={exportTxt}>Exporter .txt</button>
  </div>

<script>
  function simpleMarkdown(md) {
    if (!md) return '';
    let html = md
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/\n/g, '<br/>');
    // wrap list items
    html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
    return html;
  }
</script>

<style>
  textarea { min-height: 400px; }
</style>
