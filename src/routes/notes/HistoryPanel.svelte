<script>
  import { createEventDispatcher } from 'svelte';
  import { History, RotateCcw, Eye, X, Clock } from 'lucide-svelte';
  import ConfirmDialog from '$lib/ConfirmDialog.svelte';

  export let history = [];
  const dispatch = createEventDispatcher();
  let isRestoreConfirmOpen = false;
  let restoreTarget = null;

  function restore(item) {
    restoreTarget = item;
    isRestoreConfirmOpen = true;
  }

  function handleRestoreConfirm() {
    if (restoreTarget) {
      dispatch('restore', restoreTarget);
    }
    restoreTarget = null;
    isRestoreConfirmOpen = false;
  }

  function handleRestoreCancel() {
    restoreTarget = null;
    isRestoreConfirmOpen = false;
  }

  function preview(item) { 
    dispatch('preview', item); 
  }

  function close() {
    dispatch('close');
  }

  function formatDate(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString([], {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
</script>

<aside class="w-80 md:w-96 h-full glass-panel p-6 border-l border-white/10 shadow-2xl flex flex-col">
  <!-- Header -->
  <div class="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
    <div class="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
      <History class="w-4 h-4 icon-muted" />
      <span>Historique des versions</span>
    </div>
    <button on:click={close} class="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition">
      <X class="w-4 h-4" />
    </button>
  </div>

  <!-- Timeline Content -->
  {#if history && history.length > 0}
    <div class="flex-1 overflow-y-auto pr-1 space-y-3 relative">
      <!-- Vertical connecting line -->
      <div class="absolute left-3.5 top-3 bottom-3 w-0.5 bg-white/[0.03] pointer-events-none"></div>

      {#each history as h, i}
        <div class="relative pl-8 group">
          <!-- Timeline Bullet Node -->
          <div class="absolute left-2 top-2.5 w-3 h-3 rounded-full border-2 border-slate-900 bg-white/[0.06] group-hover:scale-125 transition-all duration-200"></div>

          <div class="p-3.5 rounded-2xl glass-card border border-white/5 space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                <Clock class="w-3 h-3 icon-muted" />
                <span>{formatDate(h.updated_at)}</span>
              </div>
              {#if i === 0}
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/[0.03] text-slate-300 border border-white/[0.06]">Dernière</span>
              {/if}
            </div>

            <div class="flex items-center gap-2 pt-1">
              <button
                on:click={() => preview(h)}
                class="flex-1 py-1.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-xs font-medium text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition"
              >
                <Eye class="w-3.5 h-3.5" />
                <span>Aperçu</span>
              </button>
              <button
                on:click={() => restore(h)}
                class="flex-1 py-1.5 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 text-xs font-medium text-slate-300 flex items-center justify-center gap-1.5 transition"
              >
                <RotateCcw class="w-3.5 h-3.5" />
                <span>Restaurer</span>
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-2">
      <History class="w-8 h-8 stroke-1 text-slate-600" />
      <p class="text-xs">Aucun historique de version disponible pour cette note.</p>
    </div>
  {/if}

  <ConfirmDialog
    open={isRestoreConfirmOpen}
    title="Restaurer cette version"
    message="Cette version de la note remplacera le contenu actuel. Voulez-vous continuer ?"
    confirmLabel="Restaurer"
    cancelLabel="Annuler"
    variant="info"
    on:confirm={handleRestoreConfirm}
    on:cancel={handleRestoreCancel}
  />
</aside>

