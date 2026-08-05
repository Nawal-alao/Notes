<script>
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase';
  import { Mail, Lock, ShieldCheck, ArrowRight, Loader2, Sparkles, Eye, EyeOff } from 'lucide-svelte';

  let email = '';
  let password = '';
  let status = '';
  let isLoading = false;
  let showPassword = false;

  async function handleSignIn() {
    isLoading = true;
    status = 'Connexion en cours…';

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      status = error.message === 'Invalid login credentials'
        ? "Identifiants incorrects. Cliquez sur « Créer un compte » s'il s'agit de votre première visite."
        : error.message;
      isLoading = false;
      return;
    }

    goto('/unlock');
  }

  async function handleSignUp() {
    isLoading = true;
    status = 'Création de votre compte sécurisé…';

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      status = error.message;
      isLoading = false;
      return;
    }

    if (!data.session) {
      status = 'Compte créé. Vérifiez votre boîte mail si une confirmation est requise.';
      isLoading = false;
      return;
    }

    goto('/unlock');
  }
</script>

<svelte:head>
  <title>Connexion · Private Notes</title>
</svelte:head>

<div class="relative flex min-h-screen items-center justify-center p-4 overflow-hidden">
  <!-- Background Glow Orbs -->
  <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>
  <div class="absolute bottom-1/4 left-1/3 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-[100px] pointer-events-none"></div>

  <div class="relative w-full max-w-md rounded-3xl glass-panel p-8 md:p-10 shadow-2xl shadow-black/50 border border-white/10">
    <!-- Header Badge -->
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-6">
      <ShieldCheck class="w-3.5 h-3.5" />
      <span>Espace Chiffré</span>
    </div>

    <div class="mb-8 space-y-2">
      <h1 class="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
        Bienvenue <Sparkles class="w-5 h-5 text-cyan-400 animate-pulse" />
      </h1>
      <p class="text-sm text-slate-400 leading-relaxed">
        Connectez-vous pour accéder à votre coffre-fort de notes privées chiffrées de bout en bout.
      </p>
    </div>

    <form class="space-y-5" on:submit|preventDefault={handleSignIn}>
      <!-- Email Field -->
      <div class="space-y-1.5">
        <label for="email-input" class="block text-xs font-medium uppercase tracking-wider text-slate-300">
          Adresse e-mail
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Mail class="w-4 h-4" />
          </div>
          <input
            id="email-input"
            bind:value={email}
            type="email"
            required
            class="w-full pl-10 pr-4 py-3 rounded-2xl glass-input text-slate-100 placeholder-slate-500 text-sm outline-none transition focus:border-cyan-400/80"
            placeholder="votre@email.com"
          />
        </div>
      </div>

      <!-- Password Field -->
      <div class="space-y-1.5">
        <label for="password-input" class="block text-xs font-medium uppercase tracking-wider text-slate-300">
          Mot de passe du compte
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Lock class="w-4 h-4" />
          </div>
          {#if showPassword}
            <input
              id="password-input"
              bind:value={password}
              type="text"
              required
              minlength="6"
              class="w-full pl-10 pr-10 py-3 rounded-2xl glass-input text-slate-100 placeholder-slate-500 text-sm outline-none transition focus:border-cyan-400/80"
              placeholder="Au moins 6 caractères"
            />
          {:else}
            <input
              id="password-input"
              bind:value={password}
              type="password"
              required
              minlength="6"
              class="w-full pl-10 pr-10 py-3 rounded-2xl glass-input text-slate-100 placeholder-slate-500 text-sm outline-none transition focus:border-cyan-400/80"
              placeholder="••••••••••••"
            />
          {/if}
          <button
            type="button"
            class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition"
            on:click={() => showPassword = !showPassword}
          >
            {#if showPassword}
              <EyeOff class="w-4 h-4" />
            {:else}
              <Eye class="w-4 h-4" />
            {/if}
          </button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="pt-2 space-y-3">
        <button
          type="submit"
          disabled={isLoading}
          class="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3.5 font-semibold text-slate-950 text-sm transition-all duration-300 hover:opacity-95 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <div class="flex items-center justify-center gap-2">
            {#if isLoading}
              <Loader2 class="w-4 h-4 animate-spin text-slate-950" />
              <span>Chargement…</span>
            {:else}
              <span>Se connecter</span>
              <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            {/if}
          </div>
        </button>

        <button
          type="button"
          on:click={handleSignUp}
          disabled={isLoading}
          class="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 font-medium text-slate-300 text-sm hover:bg-white/[0.08] hover:text-white transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Créer un nouveau compte
        </button>
      </div>
    </form>

    {#if status}
      <div class="mt-6 p-3.5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md text-xs leading-relaxed text-slate-300 flex items-start gap-2.5 animate-fadeIn">
        <div class="w-2 h-2 rounded-full bg-cyan-400 mt-1 flex-shrink-0 animate-ping"></div>
        <span>{status}</span>
      </div>
    {/if}

    <div class="mt-8 pt-6 border-t border-white/5 text-center">
      <p class="text-[11px] text-slate-500 leading-relaxed">
        Ce mot de passe protège l'accès au compte Supabase. Votre phrase de passe maître pour le déchiffrement sera demandée à la étape suivante.
      </p>
    </div>
  </div>
</div>