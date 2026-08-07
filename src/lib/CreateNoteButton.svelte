<script>
  import { Plus } from 'lucide-svelte';
  export let label = 'Nouvelle note';
  export let className = '';
  export let icon = Plus;
</script>

<button type="button" class={`rounded-md btn-primary px-4 py-2.5 text-xs font-semibold text-white transition flex items-center gap-2 ${className}`} {...$$restProps}>
  <svelte:component this={icon} class="w-4 h-4" />
  <span>{label}</span>
</button>
