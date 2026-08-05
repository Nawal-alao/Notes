<script>
  import { fly, fade } from 'svelte/transition';
  import { toasts, dismissToast } from '$lib/stores/toast';
  import { X, CheckCircle2, AlertTriangle, Info } from 'lucide-svelte';

  let items = [];
  const unsubscribe = toasts.subscribe((value) => (items = value));
  $: ordered = [...items].reverse();

  function closeToast(id) {
    dismissToast(id);
  }
</script>

<div class="toast-container pointer-events-none">
  {#each ordered as toast (toast.id)}
    <div
      in:fly={{ x: 30, duration: 200 }}
      out:fade={{ duration: 180 }}
      class="toast-item pointer-events-auto rounded-2xl border p-4 pr-3 shadow-2xl shadow-black/30 bg-slate-950/95 border-white/10 flex items-start gap-3"
    >
      <div class="mt-0.5 text-slate-300">
        {#if toast.type === 'success'}
          <CheckCircle2 class="w-5 h-5" />
        {:else if toast.type === 'error'}
          <AlertTriangle class="w-5 h-5 text-rose-400" />
        {:else}
          <Info class="w-5 h-5" />
        {/if}
      </div>
      <div class="flex-1 text-sm text-slate-100 leading-relaxed">{toast.message}</div>
      <button class="text-slate-400 hover:text-white transition" on:click={() => closeToast(toast.id)} aria-label="Fermer la notification">
        <X class="w-4 h-4" />
      </button>
    </div>
  {/each}
</div>
