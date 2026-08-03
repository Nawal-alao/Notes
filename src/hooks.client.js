import { goto } from '$app/navigation';
import { supabase } from '$lib/supabase';
import { encryptionStore } from '$lib/stores/encryption';

let initialized = false;

function getCurrentKey() {
  return new Promise((resolve) => {
    const unsubscribe = encryptionStore.subscribe((value) => {
      resolve(Boolean(value));
      unsubscribe();
    });
  });
}

export async function init() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  const { data } = await supabase.auth.getSession();
  const session = data.session;
  const hasKey = await getCurrentKey();
  const pathname = window.location.pathname;

  if (!session && pathname !== '/login') {
    goto('/login');
    return;
  }

  if (session && !hasKey && pathname !== '/unlock' && pathname !== '/login') {
    goto('/unlock');
  }
}
