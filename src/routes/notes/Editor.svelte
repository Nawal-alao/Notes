<script>
  import { onMount, tick } from 'svelte';
  import { writable, get } from 'svelte/store';
  import { slide, fade } from 'svelte/transition';
  import { encryptionStore } from '$lib/stores/encryption';
  import { notify } from '$lib/stores/toast';
  import { makeEncryptedPayload, decryptPayload, upsertNote, fetchNoteById } from '$lib/notes';
  import HistoryPanel from './HistoryPanel.svelte';
  import { goto } from '$app/navigation';
  import {
    Bold, Italic, Strikethrough, Heading1, Heading2, Heading3, List, ListOrdered, ListCheck,
    Quote, Code, Link2, Minus, Table2, Terminal,
    Maximize2, Minimize2, History, Download, Eye, Edit3, Columns,
    Check, Loader2, Sparkles, X, FileText
  } from 'lucide-svelte';

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
  let status = 'Enregistré';
  let saving = false;
  let currentNote = null;
  let showHistory = false;
  let debugRow = null;
  let previewContent = '';
  let viewMode = 'write'; // 'write' | 'preview' | 'split'
  let canSplit = false;
  let isZenMode = false;

  let editorEl;
  let savePulse = false;
  let savePulseTimer;
  let activeFormat = {
    bold: false,
    italic: false,
    heading1: false,
    heading2: false,
    heading3: false,
    list: false,
    orderedList: false,
    code: false
  };

  let showLinkModal = false;
  let linkUrl = '';
  let linkText = '';
  let linkSelectionStart = 0;
  let linkSelectionEnd = 0;
  let previewHtml = '<span class="text-slate-600 italic">Aucun contenu à prévisualiser…</span>';
  let marked = null;
  let hljs = null;
  let markdownReady = false;

  function loadExternalScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        existing.addEventListener('load', () => resolve(existing));
        existing.addEventListener('error', () => reject(new Error(`Failed to load script: ${src}`)));
        if (existing.readyState === 'complete' || existing.readyState === 'loaded') {
          resolve(existing);
        }
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve(script);
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  }

  async function loadNote(id) {
    if (!id) return;
    const key = get(encryptionStore);
    if (!key) return goto('unlock');

    try {
      const row = await fetchNoteById(id);
      if (!row) {
        currentNote = null;
        debugRow = null;
        title = '';
        body = '';
        status = 'Note introuvable';
        notify({ message: 'Impossible de charger la note : note introuvable.', type: 'error' });
        return;
      }
      currentNote = row;
      debugRow = row;
      const debugInfo = {
        id: row.id,
        title: row.title,
        title_iv: row.title_iv,
        content_iv: row.content_iv,
        encrypted_content: row.encrypted_content,
        titleType: typeof row.title,
        titleIVType: typeof row.title_iv,
        contentIVType: typeof row.content_iv,
        encryptedContentType: typeof row.encrypted_content,
        titleLength: row.title?.length,
        titleIVLength: row.title_iv?.length,
        contentIVLength: row.content_iv?.length,
        encryptedContentLength: row.encrypted_content?.length,
        titleJSON: JSON.stringify(row.title),
        titleIVJSON: JSON.stringify(row.title_iv),
        contentIVJSON: JSON.stringify(row.content_iv),
        encryptedContentJSON: JSON.stringify(row.encrypted_content)
      };
      console.log('Editor loadNote row', debugInfo);
      window.__noteDebug = debugInfo;

      let t = row.title || '';
      const titleIV = row.title_iv || row.content_iv;
      try {
        title = await decryptPayload(key, row.title, titleIV);
      } catch (e) {
        title = t;
      }

      const contentIV = row.content_iv || row.title_iv;
      try {
        body = await decryptPayload(key, row.encrypted_content, contentIV);
        status = 'Enregistré';
      } catch (e) {
        console.error('Note body decrypt failed', {
          id: row.id,
          content_iv: row.content_iv,
          title_iv: row.title_iv,
          encrypted_content: row.encrypted_content ? row.encrypted_content.slice(0, 40) : null,
          contentIV
        }, e);
        body = '';
        status = row.encrypted_content ? 'Contenu illisible — ancienne note' : 'Enregistré';
      }
    } catch (e) {
      console.error('Note load failed', e);
      currentNote = null;
      title = '';
      body = '';
      status = 'Impossible de charger la note';
      notify({ message: 'La note n’a pas pu être chargée.', type: 'error' });
    }
  }

  async function doSave() {
    const key = get(encryptionStore);
    if (!key) return goto('unlock');
    saving = true; 
    status = 'Enregistrement…';

    try {
      const prev = currentNote || {};
      const titleEnc = await makeEncryptedPayload(key, title);
      const contentEnc = await makeEncryptedPayload(key, body);

      let history = Array.isArray(prev.history) ? prev.history.slice() : [];
      try {
        if (prev.encrypted_content) {
          const prevEntry = {
            encrypted_content: prev.encrypted_content,
            content_iv: prev.content_iv,
            title: prev.title,
            title_iv: prev.title_iv,
            updated_at: prev.updated_at || new Date().toISOString()
          };
          history = [prevEntry, ...history].slice(0, 20);
        }
      } catch (e) { /* ignore */ }

      const payload = {
        id: currentNote?.id,
        title: titleEnc.ciphertextBase64,
        title_iv: titleEnc.ivBase64,
        encrypted_content: contentEnc.ciphertextBase64,
        content_iv: contentEnc.ivBase64,
        tags: currentNote?.tags || [],
        history
      };

      const saved = await upsertNote(payload);
      currentNote = saved;
      status = 'Enregistré';
      animateSave();
      onSaved(saved);
    } catch (e) {
      status = 'Échec de sauvegarde';
    } finally {
      saving = false;
    }
  }

  function animateSave() {
    savePulse = true;
    clearTimeout(savePulseTimer);
    savePulseTimer = setTimeout(() => {
      savePulse = false;
    }, 1000);
  }

  function isWrapped(start, end, marker) {
    return body.slice(Math.max(0, start - marker.length), start) === marker
      && body.slice(end, Math.min(body.length, end + marker.length)) === marker;
  }

  function linePrefixAt(cursor) {
    const lineStart = Math.max(0, body.lastIndexOf('\n', cursor - 1) + 1);
    return body.slice(lineStart, lineStart + 3);
  }

  function updateActiveFormat() {
    const start = editorEl?.selectionStart ?? 0;
    const end = editorEl?.selectionEnd ?? start;
    const prefix = linePrefixAt(start);

    activeFormat.bold = isWrapped(start, end, '**');
    activeFormat.italic = isWrapped(start, end, '*');
    activeFormat.code = isWrapped(start, end, '`');
    activeFormat.heading1 = prefix === '# ';
    activeFormat.heading2 = prefix === '## ';
    activeFormat.heading3 = prefix === '### ';
    activeFormat.list = prefix === '- ' || prefix === '* ';
    activeFormat.orderedList = /^\d+\.\s/.test(prefix);
  }

  const save = debounce(() => { doSave(); }, 600);

  async function loadMarkdownLibs() {
    if (markdownReady) return;
    try {
      const markedModule = await import('https://cdn.jsdelivr.net/npm/marked@8.0.0/lib/marked.esm.js');
      marked = markedModule.marked || markedModule.default || markedModule;

      await loadExternalScript('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js');
      hljs = window.hljs;
      if (!hljs) {
        throw new Error('highlight.js failed to initialize');
      }

      marked.setOptions({
        gfm: true,
        breaks: false,
        headerIds: false,
        mangle: false,
        highlight: (code, lang) => {
          try {
            if (lang && hljs.getLanguage?.(lang)) {
              return hljs.highlight(code, { language: lang }).value;
            }
            return hljs.highlightAuto?.(code).value || escapeHtml(code);
          } catch (e) {
            return escapeHtml(code);
          }
        }
      });
      markdownReady = true;
    } catch (err) {
      console.error('Chargement Markdown échoué', err);
    }
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  async function renderMarkdown(content) {
    if (!content) {
      return '<span class="text-slate-600 italic">Aucun contenu à prévisualiser…</span>';
    }
    await loadMarkdownLibs();
    if (marked) {
      try {
        return marked.parse(content);
      } catch (err) {
        console.error('Échec rendu Markdown', err);
      }
    }
    return simpleMarkdown(content);
  }

  const updatePreview = debounce(async () => {
    previewHtml = await renderMarkdown(body);
  }, 200);

  function insertAtCursor(text, cursorOffset = 0) {
    if (!editorEl) return;
    const start = editorEl.selectionStart;
    const end = editorEl.selectionEnd;
    const before = body.slice(0, start);
    const after = body.slice(end);
    body = before + text + after;
    tick().then(() => {
      editorEl.focus();
      const pos = start + cursorOffset;
      editorEl.setSelectionRange(pos, pos);
    });
    save();
  }

  function applyLinePrefix(prefix) {
    if (!editorEl) return;
    const start = editorEl.selectionStart;
    const end = editorEl.selectionEnd;
    const lineStart = body.lastIndexOf('\n', start - 1) + 1;
    const lineEndIndex = body.indexOf('\n', end);
    const lineEnd = lineEndIndex === -1 ? body.length : lineEndIndex;
    const block = body.slice(lineStart, lineEnd);
    const lines = block.split('\n');
    const transformed = lines.map((line) => {
      if (line.trim().length === 0) return prefix.trimEnd();
      return prefix + line.replace(/^\s*/, '');
    }).join('\n');
    body = body.slice(0, lineStart) + transformed + body.slice(lineEnd);
    tick(() => {
      editorEl.focus();
      editorEl.setSelectionRange(lineStart, lineStart + transformed.length);
    });
    save();
  }

  function openLinkModal() {
    if (!editorEl) return;
    linkSelectionStart = editorEl.selectionStart;
    linkSelectionEnd = editorEl.selectionEnd;
    linkText = body.slice(linkSelectionStart, linkSelectionEnd).trim();
    linkUrl = '';
    showLinkModal = true;
  }

  function insertLinkMarkdown() {
    if (!linkUrl) return;
    const start = linkSelectionStart;
    const end = linkSelectionEnd;
    const text = linkText || body.slice(start, end).trim() || 'lien';
    const markdown = `[${text}](${linkUrl})`;
    const before = body.slice(0, start);
    const after = body.slice(end);
    body = before + markdown + after;
    showLinkModal = false;
    linkText = '';
    linkUrl = '';
    tick(() => {
      editorEl?.focus();
      const pos = start + markdown.length;
      editorEl?.setSelectionRange(pos, pos);
    });
    save();
  }

  function insertCodeBlock() {
    const lang = window.prompt('Langage de syntaxe (optionnel) : js, python, etc.');
    if (!editorEl) return;
    const start = editorEl.selectionStart;
    const end = editorEl.selectionEnd;
    const selection = body.slice(start, end) || 'Votre code ici';
    const block = `\`\`\`${lang?.trim() || ''}\n${selection}\n\`\`\`\n`;
    insertAtCursor(block, block.length);
  }

  function insertHorizontalRule() {
    insertAtCursor('\n---\n', 5);
  }

  function insertTable() {
    insertAtCursor('\n| Colonne 1 | Colonne 2 |\n| --- | --- |\n| Valeur 1 | Valeur 2 |\n', 0);
  }

  $: if (viewMode === 'preview' || (viewMode === 'split' && canSplit)) updatePreview();
  $: if (body && (viewMode === 'preview' || (viewMode === 'split' && canSplit))) updatePreview();

  $: if (noteId) loadNote(noteId);

  onMount(() => {
    const check = () => { canSplit = window.innerWidth >= 1400; if (!canSplit && viewMode === 'split') viewMode = 'write'; };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  });

  $: wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
  $: charCount = body.length;

  function applyFormat(signature) {
    const ta = document.getElementById('main-editor');
    if (!ta) return;
    const start = ta.selectionStart, end = ta.selectionEnd;
    const before = body.slice(0, start);
    const sel = body.slice(start, end);
    const after = body.slice(end);
    body = before + signature.start + sel + signature.end + after;
    
    tick().then(() => {
      ta.focus();
      ta.setSelectionRange(start + signature.start.length, end + signature.start.length);
    });
    save();
  }

  function exportTxt() {
    const blob = new Blob([title + '\n\n' + body], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; 
    a.download = (title || 'note-privee') + '.txt'; 
    a.click();
    URL.revokeObjectURL(url);
  }

  function openHistory() {
    showHistory = true;
  }

  async function handleRestore(e) {
    const key = get(encryptionStore);
    if (!key) return goto('unlock');
    const item = e.detail;
    try {
      const decrypted = await decryptPayload(key, item.encrypted_content, item.content_iv);
      body = decrypted;
      await doSave();
      showHistory = false;
    } catch (err) {
      status = 'Erreur lors de la restauration';
    }
  }

  async function handlePreview(e) {
    const key = get(encryptionStore);
    if (!key) return goto('unlock');
    try {
      const item = e.detail;
      previewContent = await decryptPayload(key, item.encrypted_content, item.content_iv);
    } catch (err) {
      previewContent = 'Déchiffrement de la prévisualisation échoué';
    }
  }

  function simpleMarkdown(md) {
    if (!md) return '<span class="text-slate-600 italic">Aucun contenu à prévisualiser…</span>';
    let html = md
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-slate-300 mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-slate-300 mt-5 mb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-extrabold text-white mt-6 mb-3 pb-2 border-b border-white/10">$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-white">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic text-slate-200">$1</em>')
      .replace(/`(.*?)`/gim, '<code class="bg-slate-900 text-slate-300 px-1.5 py-0.5 rounded font-mono text-xs border border-white/10">$1</code>')
      .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc text-slate-300">$1</li>')
      .replace(/\n/g, '<br/>');
    return html;
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github-dark-dimmed.min.css" />
</svelte:head>

<div class="flex flex-col h-full glass-panel rounded-lg p-6 border border-white/10 shadow-2xl relative overflow-hidden transition-all duration-300 {isZenMode ? 'fixed inset-0 z-50 rounded-none border-0 p-8 bg-[#090d16]' : ''}">
  
  <!-- Header Title & Mode Bar -->
  <div class="space-y-4 mb-4 pb-4 border-b border-white/10">
    <div class="flex items-center justify-between gap-4">
      <input
        class="w-full text-2xl md:text-3xl font-serif font-extrabold bg-transparent border-0 outline-none text-white placeholder-slate-600 tracking-tight"
        bind:value={title}
        placeholder="Titre de la note…"
        on:input={() => save()}
      />

      <div class="flex items-center gap-2 flex-shrink-0">
        <!-- View Mode Switcher -->
        <div class="flex items-center p-1 rounded-md bg-white/[0.03] border border-white/10">
          <button
            on:click={() => viewMode = 'write'}
            class="p-2 rounded-xl text-xs font-medium transition flex items-center gap-1.5 {viewMode === 'write' ? 'bg-white/[0.04] text-accent border-accent' : 'text-slate-400 hover:text-white'}"
            title="Mode Édition"
          >
            <Edit3 class="w-3.5 h-3.5" />
            <span class="hidden md:inline">Éditer</span>
          </button>
          {#if canSplit}
            <button
              on:click={() => viewMode = 'split'}
              class="p-2 rounded-xl text-xs font-medium transition flex items-center gap-1.5 {viewMode === 'split' ? 'bg-white/[0.04] text-accent border-accent' : 'text-slate-400 hover:text-white'}"
              title="Vue Scindée (écrans larges)"
            >
              <Columns class="w-3.5 h-3.5" />
              <span class="hidden md:inline">Scindé</span>
            </button>
          {/if}
          <button
            on:click={() => viewMode = 'preview'}
            class="p-2 rounded-xl text-xs font-medium transition flex items-center gap-1.5 {viewMode === 'preview' ? 'bg-white/[0.04] text-accent border-accent' : 'text-slate-400 hover:text-white'}"
            title="Aperçu"
          >
            <Eye class="w-3.5 h-3.5" />
            <span class="hidden md:inline">Aperçu</span>
          </button>
        </div>

        <!-- Zen Mode Toggle -->
        <button
          on:click={() => isZenMode = !isZenMode}
          class="p-2 rounded-md bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.08] transition"
          title={isZenMode ? "Quitter le mode Zen" : "Mode Zen plein écran"}
        >
          {#if isZenMode}
            <Minimize2 class="w-4 h-4" />
          {:else}
            <Maximize2 class="w-4 h-4" />
          {/if}
        </button>
      </div>
    </div>

    <!-- Formatting Toolbar & Status -->
    <div class="flex items-center justify-between gap-3 text-xs flex-wrap font-mono text-slate-400">
      <div class="flex items-center gap-1.5 flex-wrap bg-white/[0.03] p-1.5 rounded-md border border-white/5">
        <button on:click={() => { applyFormat({ start: '**', end: '**' }); updateActiveFormat(); }} class="toolbar-button p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition {activeFormat.bold ? 'active' : ''}" title="Gras (**texte**)">
          <Bold class="w-3.5 h-3.5" />
        </button>
        <button on:click={() => { applyFormat({ start: '*', end: '*' }); updateActiveFormat(); }} class="toolbar-button p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition {activeFormat.italic ? 'active' : ''}" title="Italique (*texte*)">
          <Italic class="w-3.5 h-3.5" />
        </button>
        <button on:click={() => { applyFormat({ start: '~~', end: '~~' }); updateActiveFormat(); }} class="toolbar-button p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition" title="Barré (~~texte~~)">
          <Strikethrough class="w-3.5 h-3.5" />
        </button>
        <div class="w-px h-4 bg-white/10 mx-1"></div>
        <button on:click={() => { applyFormat({ start: '# ', end: '' }); updateActiveFormat(); }} class="toolbar-button p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition {activeFormat.heading1 ? 'active' : ''}" title="Titre 1">
          <Heading1 class="w-3.5 h-3.5" />
        </button>
        <button on:click={() => { applyFormat({ start: '## ', end: '' }); updateActiveFormat(); }} class="toolbar-button p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition {activeFormat.heading2 ? 'active' : ''}" title="Titre 2">
          <Heading2 class="w-3.5 h-3.5" />
        </button>
        <button on:click={() => { applyFormat({ start: '### ', end: '' }); updateActiveFormat(); }} class="toolbar-button p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition {activeFormat.heading3 ? 'active' : ''}" title="Titre 3">
          <Heading3 class="w-3.5 h-3.5" />
        </button>
        <div class="w-px h-4 bg-white/10 mx-1"></div>
        <button on:click={() => applyLinePrefix('- ')} class="toolbar-button p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition" title="Liste à puces">
          <List class="w-3.5 h-3.5" />
        </button>
        <button on:click={() => applyLinePrefix('1. ')} class="toolbar-button p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition" title="Liste numérotée">
          <ListOrdered class="w-3.5 h-3.5" />
        </button>
        <button on:click={() => applyLinePrefix('- [ ] ')} class="toolbar-button p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition" title="Liste de tâches">
          <ListCheck class="w-3.5 h-3.5" />
        </button>
        <button on:click={() => applyLinePrefix('> ')} class="toolbar-button p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition" title="Citation">
          <Quote class="w-3.5 h-3.5" />
        </button>
        <div class="w-px h-4 bg-white/10 mx-1"></div>
        <button on:click={() => { applyFormat({ start: '`', end: '`' }); updateActiveFormat(); }} class="toolbar-button p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition {activeFormat.code ? 'active' : ''}" title="Code en ligne">
          <Code class="w-3.5 h-3.5" />
        </button>
        <button on:click={insertCodeBlock} class="toolbar-button p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition" title="Bloc de code">
          <Terminal class="w-3.5 h-3.5" />
        </button>
        <button on:click={openLinkModal} class="toolbar-button p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition" title="Lien [texte](url)">
          <Link2 class="w-3.5 h-3.5" />
        </button>
        <button on:click={insertHorizontalRule} class="toolbar-button p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition" title="Ligne horizontale">
          <Minus class="w-3.5 h-3.5" />
        </button>
        <button on:click={insertTable} class="toolbar-button p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition" title="Tableau Markdown">
          <Table2 class="w-3.5 h-3.5" />
        </button>
      </div>

      <!-- Action Buttons (Export, History, Save Indicator) -->
      <div class="flex items-center gap-2">
        <div class="save-indicator px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-slate-400">
          {#if saving}
            <Loader2 class="w-3 h-3 text-accent animate-spin" />
            <span class="text-[11px] text-accent">Sauvegarde…</span>
          {:else}
            <div class="save-badge {savePulse ? 'pulse' : ''}"></div>
            <span class="text-[11px] text-slate-300">{status}</span>
          {/if}
        </div>

        <button
          on:click={exportTxt}
          class="p-2 rounded-md bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.08] transition flex items-center gap-1.5"
          title="Exporter en fichier .txt"
        >
          <Download class="w-3.5 h-3.5" />
          <span class="hidden sm:inline">Export</span>
        </button>

        <button
          on:click={openHistory}
          class="p-2 rounded-md bg-white/[0.03] border border-white/10 text-slate-300 hover:bg-white/[0.05] transition flex items-center gap-1.5 font-medium"
          title="Historique des versions"
        >
          <History class="w-3.5 h-3.5" />
          <span class="hidden sm:inline">Historique</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Workspace Body Area -->
  <div class="flex-1 min-h-0 grid gap-4 relative {viewMode === 'split' && canSplit ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}">
    <!-- Editor Textarea -->
    {#if viewMode === 'write' || (viewMode === 'split' && canSplit)}
      <textarea
        id="main-editor"
        bind:this={editorEl}
        bind:value={body}
        class="editor-textarea w-full h-full min-h-[420px] md:min-h-[460px] p-4 rounded-md glass-input text-slate-100 placeholder-slate-600 font-sans text-sm leading-relaxed resize-none outline-none border border-white/10 transition overflow-y-auto"
        placeholder="Commencez à rédiger votre note chiffrée ici (support Markdown)…"
        on:input={() => { save(); updateActiveFormat(); updatePreview(); }}
        on:keyup={() => { updateActiveFormat(); updatePreview(); }}
        on:mouseup={() => { updateActiveFormat(); updatePreview(); }}
      ></textarea>
    {/if}

    <!-- Live Markdown Preview -->
    {#if viewMode === 'preview' || (viewMode === 'split' && canSplit)}
      <div class="w-full h-full p-6 rounded-2xl glass-card border border-white/10 overflow-y-auto overflow-x-auto leading-relaxed prose prose-invert max-w-none text-slate-200 preview-content">
        <div>{@html previewHtml}</div>
      </div>
    {/if}
  </div>

  <!-- Bottom Status Bar (Counters) -->
  <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
    <div class="flex items-center gap-4">
      <span><strong>{wordCount}</strong> mots</span>
      <span><strong>{charCount}</strong> caractères</span>
    </div>
    <div class="flex items-center gap-1 text-slate-400">
      <FileText class="w-3 h-3 icon-muted" />
      <span>AES-GCM Chiffrement Actif</span>
    </div>
  </div>

  <!-- Version History Drawer -->
  {#if showHistory}
    <div transition:slide={{ duration: 250, axis: 'x' }} class="fixed right-0 top-0 bottom-0 z-50">
      <HistoryPanel
        history={currentNote?.history || []}
        on:restore={handleRestore}
        on:preview={handlePreview}
        on:close={() => showHistory = false}
      />
    </div>
  {/if}

  <!-- History Preview Modal -->
  {#if previewContent}
    <div transition:fade={{ duration: 150 }} class="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-6">
      <div class="w-full max-w-2xl glass-panel p-6 rounded-lg border border-white/10 shadow-2xl flex flex-col max-h-[80vh]">
        <div class="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <h4 class="text-sm font-bold text-white flex items-center gap-2">
            <Eye class="w-4 h-4 icon-muted" />
            <span>Aperçu de la version archivée</span>
          </h4>
          <button on:click={() => previewContent = ''} class="text-slate-400 hover:text-white p-1 rounded-lg">
            <X class="w-4 h-4" />
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-4 rounded-md bg-slate-950/60 font-mono text-xs leading-relaxed text-slate-200 whitespace-pre-wrap border border-white/5">
          {previewContent}
          </div>


        <div class="mt-4 pt-3 flex justify-end">
          <button on:click={() => previewContent = ''} class="px-4 py-2 rounded-md bg-white/[0.06] text-xs font-semibold text-slate-300 hover:text-white transition">
            Fermer l'aperçu
          </button>
        </div>
      </div>
    </div>
  {/if}

  {#if showLinkModal}
    <div transition:fade={{ duration: 150 }} class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
      <div class="w-full max-w-lg glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-sm font-bold text-white">Insérer un lien Markdown</h3>
            <p class="text-xs text-slate-400">Le texte sélectionné sera utilisé comme texte du lien.</p>
          </div>
          <button on:click={() => showLinkModal = false} class="text-slate-400 hover:text-white p-1 rounded-lg">
            <X class="w-4 h-4" />
          </button>
        </div>

        <div class="space-y-4">
          <label class="block text-xs uppercase tracking-[0.18em] text-slate-400">URL</label>
          <input
            class="w-full rounded-2xl glass-input px-4 py-3 text-slate-100 outline-none border border-white/10"
            type="url"
            bind:value={linkUrl}
            placeholder="https://example.com"
          />
          <label class="block text-xs uppercase tracking-[0.18em] text-slate-400">Texte du lien</label>
          <input
            class="w-full rounded-2xl glass-input px-4 py-3 text-slate-100 outline-none border border-white/10"
            type="text"
            bind:value={linkText}
            placeholder="Texte du lien"
          />
        </div>

        <div class="mt-6 flex justify-end gap-2">
          <button type="button" on:click={() => showLinkModal = false} class="px-4 py-2 rounded-2xl bg-white/[0.05] text-slate-300 hover:text-white transition">
            Annuler
          </button>
          <button type="button" on:click={insertLinkMarkdown} class="px-4 py-2 rounded-2xl btn-primary text-xs font-semibold text-white transition">
            Insérer le lien
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .editor-textarea:focus {
    outline: none;
    border-color: transparent;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1), 0 4px 20px rgba(0, 0, 0, 0.5);
  }
</style>

