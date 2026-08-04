<script>
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  const dispatch = createEventDispatcher();

  export let folders = [];
  export let selected = 'all';

  function select(id) {
    dispatch('select', id);
  }

  function newFolder() {
    const name = prompt('Nom du dossier');
    if (name) dispatch('create', name);
  }

  function rename(id) {
    const name = prompt('Nouveau nom');
    if (name) dispatch('rename', { id, name });
  }

  function remove(id) {
    if (confirm('Supprimer ce dossier ?')) dispatch('delete', id);
  }
</script>

<aside class="w-64 bg-slate-900/70 p-4 rounded-xl shadow-lg">
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-sm uppercase tracking-wide text-fuchsia-400">Dossiers</h3>
    <button class="text-sm text-slate-300 hover:text-white" on:click={newFolder}>Nouveau</button>
  </div>

  <ul class="space-y-2">
    {#each folders as f (f.id)}
      <li transition:fly={{ y: 6, duration: 220 }} class="flex items-center justify-between">
        <button class="text-left w-full flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-800/60 {selected===f.id? 'bg-slate-800/40':''}"
          on:click={() => select(f.id)}>
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <div class="text-sm font-medium text-slate-100">{f.name}</div>
              <div class="text-xs text-slate-400">{f.count}</div>
            </div>
            <div class="text-xs text-slate-400 truncate">{f.description}</div>
          </div>
        </button>

        <div class="flex gap-1 ml-2">
          <button class="text-slate-400 hover:text-white text-xs" on:click={() => rename(f.id)}>✎</button>
          <button class="text-slate-400 hover:text-white text-xs" on:click={() => remove(f.id)}>🗑</button>
        </div>
      </li>
    {/each}
  </ul>
</aside>

<style>
  .selected { background: rgba(255,255,255,0.02); }
</style>
