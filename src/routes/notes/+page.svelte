<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase';
  import { encryptionStore } from '$lib/stores/encryption';

  let ready = false;

  onMount(async () => {
    const { data } = await supabase.auth.getSession();
    const key = await new Promise((resolve) => {
      const unsub = encryptionStore.subscribe((value) => {
        resolve(value);
        unsub();
      });
    });

    if (!data.session || !key) {
      goto('/unlock');
      return;
    }

    ready = true;
  });
</script>

<svelte:head>
  <title>Notes · Private Notes</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center px-4">
  <div class="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/30">
    <h1 class="text-2xl font-semibold">Votre espace de notes</h1>
    <p class="mt-3 text-sm text-slate-400">L’éditeur et la synchronisation arrivent dans la prochaine étape. Le flux d’authentification et de déverrouillage est prêt.</p>
  </div>
</div>
