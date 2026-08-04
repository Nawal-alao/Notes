<script>
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase';

  let email = '';
  let status = '';
  let isLoading = false;

  async function handleSubmit() {
    isLoading = true;
    status = 'Envoi du magic link…';

    const redirectTo = typeof window !== 'undefined'
      ? new URL('/unlock', window.location.origin).toString()
      : '/unlock';

    console.log('redirectTo utilisé :', redirectTo);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      status = error.message;
    } else {
      status = 'Vérifiez votre boîte mail pour ouvrir le lien de connexion.';
    }

    isLoading = false;
  }
</script>

<svelte:head>
  <title>Connexion · Notes privées</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_45%)] px-4">
  <div class="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/30 backdrop-blur">
    <div class="mb-8 space-y-2">
      <p class="text-sm uppercase tracking-[0.35em] text-cyan-400">Private Notes</p>
      <h1 class="text-3xl font-semibold">Accédez à votre espace sécurisé</h1>
      <p class="text-sm text-slate-400">Un magic link vous connecte, puis vous déverrouillez vos notes avec votre phrase de passe maître.</p>
    </div>

    <form class="space-y-4" on:submit|preventDefault={handleSubmit}>
      <label class="block text-sm text-slate-300">
        Adresse e-mail
        <input bind:value={email} type="email" required class="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none ring-0 transition focus:border-cyan-400" placeholder="vous@example.com" />
      </label>

      <button type="submit" disabled={isLoading} class="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">
        {isLoading ? 'Envoi…' : 'Recevoir un magic link'}
      </button>
    </form>

    {#if status}
      <p class="mt-6 text-sm text-slate-300">{status}</p>
    {/if}
  </div>
</div>
