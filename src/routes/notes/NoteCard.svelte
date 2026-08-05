<script>
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import { FileText, FileDown, Trash2, Clock, Tag } from 'lucide-svelte';
  import ConfirmDialog from '$lib/ConfirmDialog.svelte';

  export let note;
  export let index = 0;
  export let isSelected = false;

  let ghostEl;
  let isConfirmOpen = false;
  const dispatch = createEventDispatcher();

  function open() { dispatch('open', note.id); }
  function remove() { isConfirmOpen = true; }
  function exportNote(type) { dispatch('export', { id: note.id, type }); }

  function handleDeleteConfirm() {
    dispatch('delete', note.id);
    isConfirmOpen = false;
  }

  function handleDeleteCancel() {
    isConfirmOpen = false;
  }

  function formatDate(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    const now = new Date();
    const diffSec = Math.floor((now - date) / 1000);
    
    if (diffSec < 60) return 'À l\'instant';
    if (diffSec < 3600) return `Il y a ${Math.floor(diffSec / 60)} min`;
    if (diffSec < 86400) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return date.toLocaleDateString([], { day: '2-digit', month: 'short' });
  }
</script>

<div
  role="button"
  tabindex="0"
  class="group relative w-full p-4 rounded-2xl cursor-pointer text-left transition-all duration-200 glass-card {isSelected ? 'bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-transparent border-cyan-500/40 ring-1 ring-cyan-500/30 shadow-xl shadow-cyan-500/10' : ''}"
  on:click={open}
  on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && open()}
  draggable="true"
  on:dragstart={(e) => {
    e.dataTransfer.setData('text/plain', note.id);
    e.currentTarget.classList.add('opacity-50', 'scale-95');
    ghostEl = document.createElement('div');
    ghostEl.className = 'fixed top-[-1000px] bg-slate-900 text-white px-3 py-2 rounded-xl text-xs shadow-2xl border border-cyan-500/40 font-semibold';
    ghostEl.textContent = note.title || 'Sans titre';
    document.body.appendChild(ghostEl);
    e.dataTransfer.setDragImage(ghostEl, 20, 15);
  }}
  on:dragend={(e) => {
    e.currentTarget.classList.remove('opacity-50', 'scale-95');
    if (ghostEl && ghostEl.parentNode) ghostEl.parentNode.removeChild(ghostEl);
    ghostEl = null;
  }}
  in:fly={{ y: 10, duration: 200, delay: Math.min(index * 30, 300) }}
>
  <!-- Selected Indicator Pill -->
  {#if isSelected}
    <div class="absolute left-0 top-3 bottom-3 w-1 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full shadow-lg shadow-cyan-400/50"></div>
  {/if}

  <div class="flex items-start justify-between gap-3 mb-1.5">
    <div class="flex items-center gap-2 min-w-0">
      <FileText class="w-4 h-4 flex-shrink-0 {isSelected ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'}" />
      <h4 class="text-sm font-semibold truncate text-slate-100 group-hover:text-white">
        {note.titlePreview || note.title || 'Sans titre'}
      </h4>
    </div>

    <div class="flex items-center gap-1 text-[11px] text-slate-400 flex-shrink-0">
      <Clock class="w-3 h-3 text-slate-500" />
      <span>{formatDate(note.updated_at)}</span>
    </div>
  </div>

  <!-- Note Content Snippet -->
  <p class="text-xs text-slate-400 group-hover:text-slate-300 line-clamp-2 leading-relaxed mb-3">
    {note.preview || 'Note vide…'}
  </p>

  <!-- Footer Tags & Actions -->
  <div class="flex items-center justify-between text-xs pt-1 border-t border-white/[0.04]">
    <div class="flex items-center gap-1.5 flex-wrap min-w-0">
      {#if note.tags && note.tags.length > 0}
        {#each note.tags.slice(0, 2) as tag}
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            <Tag class="w-2.5 h-2.5" />
            <span>{tag}</span>
          </span>
        {/each}
      {:else}
        <span class="text-[11px] text-slate-600 italic">Sans tag</span>
      {/if}
    </div>

    <!-- Actions menu -->
    <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        type="button"
        class="p-1 text-slate-400 hover:text-cyan-300 hover:bg-white/10 rounded-lg transition"
        on:click|stopPropagation={() => exportNote('txt')}
        title="Exporter en TXT"
      >
        <FileDown class="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        class="p-1 text-slate-400 hover:text-rose-400 hover:bg-white/10 rounded-lg transition"
        on:click|stopPropagation={remove}
        title="Supprimer la note"
      >
        <Trash2 class="w-3.5 h-3.5" />
      </button>
    </div>
  </div>

  <ConfirmDialog
    open={isConfirmOpen}
    title="Supprimer cette note"
    message="La note sera définitivement supprimée de votre coffre-fort chiffré. Êtes-vous sûr ?"
    confirmLabel="Supprimer"
    cancelLabel="Annuler"
    variant="error"
    on:confirm={handleDeleteConfirm}
    on:cancel={handleDeleteCancel}
  />
</div>

