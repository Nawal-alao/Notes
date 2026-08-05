<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { arrayBufferToBase64, base64ToArrayBuffer, deriveKey, encryptionStore } from '$lib/stores/encryption';
  import { KeyRound, Shield, Eye, EyeOff, Loader2, Lock, ArrowRight, LogOut } from 'lucide-svelte';

  let passphrase = '';
  let status = '';
  let isLoading = false;
  let showPassphrase = false;

  onMount(async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      goto('/login');
    }
  });

  async function handleLogout() {
    await supabase.auth.signOut();
    goto('/login');
  }

  async function handleSubmit() {
    isLoading = true;
    status = 'Dérivation de la clé AES-256 PBKDF2…';

    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData?.session?.user;

    if (!user) {
      status = 'Session introuvable. Veuillez vous re-connecter.';
      isLoading = false;
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('salt, encrypted_verifier, verifier_iv')
      .eq('user_id', user.id)
      .single();

    let key;
    try {
      if (profileError || !profileData) {
        status = 'Initialisation de la première clé maître…';
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const verifierIv = crypto.getRandomValues(new Uint8Array(12));
        key = await deriveKey(passphrase, salt);
        const verifierBuffer = await crypto.subtle.encrypt(
          { name: 'AES-GCM', iv: verifierIv },
          key,
          new TextEncoder().encode('VALID')
        );

        const upsertPayload = {
          user_id: user.id,
          salt: arrayBufferToBase64(salt),
          encrypted_verifier: arrayBufferToBase64(verifierBuffer),
          verifier_iv: arrayBufferToBase64(verifierIv)
        };

        const { error } = await supabase.from('profiles').upsert(upsertPayload);
        if (error) {
          status = error.message;
          isLoading = false;
          return;
        }
      } else {
        const salt = base64ToArrayBuffer(profileData.salt);
        key = await deriveKey(passphrase, salt);
        const verifierBytes = base64ToArrayBuffer(profileData.encrypted_verifier);
        const verifierIv = base64ToArrayBuffer(profileData.verifier_iv);
        await crypto.subtle.decrypt({ name: 'AES-GCM', iv: verifierIv }, key, verifierBytes);
      }
    } catch (err) {
      console.error(err);
      status = 'Phrase de passe maître incorrecte. Impossible de déchiffrer.';
      isLoading = false;
      return;
    }

    encryptionStore.set(key);
    try {
      await goto('/notes');
    } catch (navigationError) {
      console.error('Navigation failed', navigationError);
    } finally {
      isLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Déverrouillage · Private Notes</title>
</svelte:head>

<div class="relative flex min-h-screen items-center justify-center p-4 overflow-hidden">
  <div class="relative w-full max-w-md rounded-md glass-panel p-8 md:p-10 border border-white/10">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-transparent border border-white/6 text-slate-300 text-xs font-semibold tracking-wider uppercase">
        <KeyRound class="w-3.5 h-3.5 icon-muted" />
        <span>Coffre Fort Scellé</span>
      </div>

      <button 
        type="button" 
        on:click={handleLogout}
        class="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 py-1 px-2.5 rounded-lg hover:bg-white/[0.03] transition"
        title="Déconnexion du compte"
      >
        <LogOut class="w-3.5 h-3.5 icon-muted" />
        <span>Changer de compte</span>
      </button>
    </div>

    <div class="mb-8 space-y-2">
      <h1 class="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
        Déverrouiller <Lock class="w-5 h-5 icon-muted" />
      </h1>
      <p class="text-sm text-slate-400 leading-relaxed">
        Saisissez votre phrase de passe maître. Elle dérive localement votre clé AES-GCM et n'est jamais transmise au serveur.
      </p>
    </div>

    <form class="space-y-5" on:submit|preventDefault={handleSubmit}>
      <div class="space-y-1.5">
        <label for="passphrase-input" class="block text-xs font-medium uppercase tracking-wider text-slate-300">
          Phrase de passe maître
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Shield class="w-4 h-4 icon-muted" />
          </div>
          {#if showPassphrase}
            <input
              id="passphrase-input"
              bind:value={passphrase}
              type="text"
              required
              class="w-full pl-10 pr-10 py-3.5 rounded-md glass-input text-slate-100 placeholder-slate-500 text-sm outline-none transition"
              placeholder="Votre phrase secrète..."
            />
          {:else}
            <input
              id="passphrase-input"
              bind:value={passphrase}
              type="password"
              required
              class="w-full pl-10 pr-10 py-3.5 rounded-md glass-input text-slate-100 placeholder-slate-500 text-sm outline-none transition"
              placeholder="••••••••••••"
            />
          {/if}
          <button
            type="button"
            class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition"
            on:click={() => showPassphrase = !showPassphrase}
            aria-label="Afficher le mot de passe"
          >
            {#if showPassphrase}
              <EyeOff class="w-4 h-4 icon-muted" />
            {:else}
              <Eye class="w-4 h-4 icon-muted" />
            {/if}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        class="w-full btn-primary px-5 py-3.5 font-semibold text-sm rounded-md flex items-center justify-center gap-2"
      >
        {#if isLoading}
          <Loader2 class="w-4 h-4 animate-spin text-white" />
          <span>Déverrouillage en cours…</span>
        {:else}
          <span>Déverrouiller</span>
          <ArrowRight class="w-4 h-4" />
        {/if}
      </button>
    </form>

    {#if status}
      <div class="mt-6 p-3.5 rounded-md border border-white/10 bg-white/[0.02] text-xs leading-relaxed text-slate-300 flex items-start gap-2.5 animate-fadeIn">
        <div class="w-2 h-2 rounded-full bg-white/[0.06] mt-1 flex-shrink-0"></div>
        <span>{status}</span>
      </div>
    {/if}

    <div class="mt-8 pt-6 border-t border-white/5 text-center">
      <p class="text-[11px] text-slate-500 leading-relaxed">
        Chiffrement Zero-Knowledge : si vous oubliez votre phrase maître, vos données restent indéchiffrables.
      </p>
    </div>
  </div>
</div>
