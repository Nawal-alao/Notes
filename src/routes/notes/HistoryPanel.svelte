<script>
  import { createEventDispatcher } from 'svelte';
  export let history = [];
  const dispatch = createEventDispatcher();

  function restore(item) { if (confirm('Restaurer cette version ?')) dispatch('restore', item); }
</script>

<aside class="w-96 bg-slate-900 p-4 rounded-l shadow-lg">
  <h3 class="text-sm text-fuchsia-400 uppercase tracking-wide mb-3">Historique</h3>
  <ul class="space-y-2">
    {#each history as h}
      <li class="p-2 bg-slate-800/40 rounded">
        <div class="flex items-center justify-between">
          <div class="text-sm text-slate-100">{new Date(h.updated_at).toLocaleString()}</div>
          <button class="text-xs text-slate-300" on:click={() => restore(h)}>Restaurer</button>
        </div>
      </li>
    {/each}
  </ul>
</aside>
