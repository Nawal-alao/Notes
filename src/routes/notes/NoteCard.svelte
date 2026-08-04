<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  let ghostEl;
  const dispatch = createEventDispatcher();

  function open() { dispatch('open', note.id); }
  function remove() { if(confirm('Supprimer la note ?')) dispatch('delete', note.id); }
  function exportNote(type) { dispatch('export', { id: note.id, type }); }
</script>

  <article class="p-3 rounded-lg hover:bg-slate-800/50 cursor-pointer" on:click={open} transition:fade draggable="true"
  on:dragstart={(e)=>{
    e.dataTransfer.setData('text/plain', note.id);
    e.currentTarget.classList.add('dragging');
    // create ghost preview
    ghostEl = document.createElement('div');
    ghostEl.className = 'drag-ghost';
    ghostEl.textContent = note.title || 'Sans titre';
    document.body.appendChild(ghostEl);
    // offset to centre the ghost under pointer
    e.dataTransfer.setDragImage(ghostEl, 40, 20);
  }}
  on:dragend={(e)=>{ e.currentTarget.classList.remove('dragging'); if (ghostEl && ghostEl.parentNode) ghostEl.parentNode.removeChild(ghostEl); ghostEl = null; }}
  transition:fly={{ y: 8, duration: 240, delay: index * 40 }}>
  <div class="flex items-center justify-between">
    <h4 class="text-sm font-semibold text-slate-100">{note.titlePreview || note.title || 'Sans titre'}</h4>
    <div class="text-xs text-slate-400">{new Date(note.updated_at).toLocaleString()}</div>
  </div>
  <p class="mt-1 text-sm text-slate-300 line-clamp-2">{note.preview || ''}</p>
  <div class="mt-3 flex items-center gap-2 text-xs">
    <button class="text-slate-400 hover:text-white" on:click|stopPropagation={() => exportNote('txt')}>Export .txt</button>
    <button class="text-slate-400 hover:text-white" on:click|stopPropagation={() => exportNote('pdf')}>Export .pdf</button>
    <button class="ml-auto text-slate-400 hover:text-white" on:click|stopPropagation={remove}>Supprimer</button>
  </div>
</article>

<style>
  article.dragging {
    transform: rotate(-2deg) scale(1.03);
    box-shadow: 0 18px 40px rgba(0,0,0,0.6);
    opacity: 0.98;
    transition: transform 160ms cubic-bezier(.2,.9,.3,1), box-shadow 160ms;
  }

  article:hover { transform: translateY(-2px); }
</style>
