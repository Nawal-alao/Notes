<script>
  import { createEventDispatcher } from 'svelte';
  import { AlertTriangle, CheckCircle2, Info } from 'lucide-svelte';

  export let open = false;
  export let title = 'Confirmer';
  export let message = '';
  export let confirmLabel = 'Confirmer';
  export let cancelLabel = 'Annuler';
  export let variant = 'info';

  const dispatch = createEventDispatcher();

  function confirm() {
    dispatch('confirm');
  }

  function cancel() {
    dispatch('cancel');
  }
</script>

{#if open}
  <div class="fixed inset-0 z-50 flex items-center justify-center modal-backdrop p-4">
    <div class="modal-panel w-full max-w-sm rounded-3xl p-6 space-y-5 shadow-2xl shadow-black/30">
      <div class="flex items-start gap-3">
        <div class="mt-1 text-cyan-300">
          {#if variant === 'error'}
            <AlertTriangle class="w-6 h-6 text-rose-400" />
          {:else if variant === 'success'}
            <CheckCircle2 class="w-6 h-6 text-emerald-400" />
          {:else}
            <Info class="w-6 h-6" />
          {/if}
        </div>
        <div>
          <h3 class="text-lg font-semibold text-white">{title}</h3>
          <p class="mt-1 text-sm leading-relaxed text-slate-300">{message}</p>
        </div>
      </div>

      <div class="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          class="px-4 py-2 rounded-2xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.05] transition"
          on:click={cancel}
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          class="px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-semibold transition hover:opacity-95"
          on:click={confirm}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
{/if}
