<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { arrayBufferToBase64, base64ToArrayBuffer, deriveKey, encryptionStore } from '$lib/stores/encryption';

  let passphrase = '';
  let status = '';
  let isLoading = false;

  onMount(async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      goto('/login');
    }
  });

  async function handleSubmit() {
    isLoading = true;
    status = 'Vérification de la phrase de passe…';

    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData?.session?.user;

    if (!user) {
      status = 'Session Supabase introuvable.';
      isLoading = false;
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('salt, encrypted_verifier, verifier_iv')
      .eq('user_id', user.id)
      .single();

    try {
      if (profileError || !profileData) {
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const verifierIv = crypto.getRandomValues(new Uint8Array(12));
        const key = await deriveKey(passphrase, salt);
        const verifierBuffer = await crypto.subtle.encrypt(
          { name: 'AES-GCM', iv: verifierIv },
          key,
          new TextEncoder().encode('VALID')
        );

        const { error } = await supabase.from('profiles').upsert({
          user_id: user.id,
          salt: arrayBufferToBase64(salt),
          encrypted_verifier: arrayBufferToBase64(verifierBuffer),
          verifier_iv: arrayBufferToBase64(verifierIv)
        });

        if (error) {
          status = error.message;
          isLoading = false;
          return;
        }

        encryptionStore.set(key);
        goto('/notes');
        return;
      }

      const salt = base64ToArrayBuffer(profileData.salt);
      const key = await deriveKey(passphrase, salt);
      const verifierBytes = base64ToArrayBuffer(profileData.encrypted_verifier);
      const verifierIv = base64ToArrayBuffer(profileData.verifier_iv);
      await crypto.subtle.decrypt({ name: 'AES-GCM', iv: verifierIv }, key, verifierBytes);
      encryptionStore.set(key);
      goto('/notes');
    } catch {
      status = 'Phrase de passe incorrecte.';
    } finally {
      isLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Déverrouillage · Notes privées</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.14),_transparent_45%)] px-4">
  <div class="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/30 backdrop-blur">
    <div class="mb-8 space-y-2">
      <p class="text-sm uppercase tracking-[0.35em] text-fuchsia-400">Master key</p>
      <h1 class="text-3xl font-semibold">Déverrouillez votre coffre</h1>
      <p class="text-sm text-slate-400">Votre phrase de passe maître dérive la clé de chiffrement. Elle n’est jamais stockée.</p>
    </div>

    <form class="space-y-4" on:submit|preventDefault={handleSubmit}>
      <label class="block text-sm text-slate-300">
        Phrase de passe maître
        <input bind:value={passphrase} type="password" required class="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none transition focus:border-fuchsia-400" placeholder="Saisissez votre phrase secrète" />
      </label>

      <button type="submit" disabled={isLoading} class="w-full rounded-2xl bg-fuchsia-500 px-4 py-3 font-medium text-slate-950 transition hover:bg-fuchsia-400 disabled:cursor-not-allowed disabled:opacity-60">
        {isLoading ? 'Vérification…' : 'Déverrouiller'}
      </button>
    </form>

    {#if status}
      <p class="mt-6 text-sm text-slate-300">{status}</p>
    {/if}
  </div>
</div>
