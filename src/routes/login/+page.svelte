<script>
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase';

  let email = '';
  let password = '';
  let status = '';
  let isLoading = false;

  async function handleSignIn() {
    isLoading = true;
    status = 'Connexion…';

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      status = error.message === 'Invalid login credentials'
        ? "Aucun compte avec ces identifiants. Utilise « Créer un compte » si c'est ta première visite."
        : error.message;
      isLoading = false;
      return;
    }

    goto('/unlock');
  }

  async function handleSignUp() {
    isLoading = true;
    status = 'Création du compte…';

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      status = error.message;
      isLoading = false;
      return;
    }

    if (!data.session) {
      // Ne devrait pas arriver puisque "Confirm email" est désactivé,
      // mais on garde un message clair au cas où.
      status = 'Compte créé. Vérifie ta boîte mail si une confirmation est requise.';
      isLoading = false;
      return;
    }

    goto('/unlock');
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
      <p class="text-sm text-slate-400">Connectez-vous avec votre e-mail et mot de passe de compte, puis déverrouillez vos notes avec votre phrase de passe maître.</p>
    </div>

    <form class="space-y-4" on:submit|preventDefault={handleSignIn}>
      <label class="block text-sm text-slate-300">
        Adresse e-mail
        <input bind:value={email} type="email" required class="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none ring-0 transition focus:border-cyan-400" placeholder="vous@example.com" />
      </label>

      <label class="block text-sm text-slate-300">
        Mot de passe du compte
        <input bind:value={password} type="password" required minlength="6" class="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none ring-0 transition focus:border-cyan-400" placeholder="Au moins 6 caractères" />
      </label>

      <div class="flex gap-3">
        <button type="submit" disabled={isLoading} class="flex-1 rounded-2xl bg-cyan-500 px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">
          {isLoading ? 'Patientez…' : 'Se connecter'}
        </button>
        <button type="button" on:click={handleSignUp} disabled={isLoading} class="flex-1 rounded-2xl border border-cyan-400/40 px-4 py-3 font-medium text-cyan-300 transition hover:bg-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-60">
          Créer un compte
        </button>
      </div>
    </form>

    {#if status}
      <p class="mt-6 text-sm text-slate-300">{status}</p>
    {/if}

    <p class="mt-6 text-xs text-slate-500">Ce mot de passe protège l'accès à ton compte. Il est différent de la phrase de passe maître qui chiffre tes notes, demandée à l'étape suivante.</p>
  </div>
</div>