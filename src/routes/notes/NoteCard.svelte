<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  export let note;
  const dispatch = createEventDispatcher();

  function open() { dispatch('open', note.id); }
  function remove() { if(confirm('Supprimer la note ?')) dispatch('delete', note.id); }
  function exportNote(type) { dispatch('export', { id: note.id, type }); }
</script>

<article class="p-3 rounded-lg hover:bg-slate-800/50 cursor-pointer" on:click={open} transition:fade>
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
