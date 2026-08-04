import { supabase } from '$lib/supabase';
import { arrayBufferToBase64, base64ToArrayBuffer } from '$lib/stores/encryption';

export async function fetchNotes() {
  const { data, error } = await supabase
    .from('notes')
    .select('id, user_id, title, tags, encrypted_content, content_iv, updated_at, history')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function fetchNoteById(id) {
  const { data, error } = await supabase.from('notes').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function upsertNote(note) {
  // note: expected shape { id?, user_id, title (base64), encrypted_content (base64), content_iv (base64), tags, history }
  let { data, error } = await supabase.from('notes').upsert(note).select().single();
  if (error) {
    // If the error is about an unknown column (history), retry without history
    if (error.message && error.message.toLowerCase().includes('column') && note.history) {
      const copy = { ...note };
      delete copy.history;
      const r = await supabase.from('notes').upsert(copy).select().single();
      if (r.error) throw r.error;
      return r.data;
    }
    throw error;
  }
  return data;
}

export async function deleteNote(id) {
  const { error } = await supabase.from('notes').delete().eq('id', id);
  if (error) throw error;
  return true;
}

export function subscribeToNotes(callback) {
  // callback receives the realtime payload from Supabase
  const channel = supabase
    .channel('notes_changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'notes' }, (payload) => {
      try { callback(payload); } catch (e) { console.error('subscribeToNotes callback error', e); }
    });

  channel.subscribe();

  return async () => {
    try { await channel.unsubscribe(); } catch (e) { console.warn('unsubscribe failed', e); }
  };
}

export function makeEncryptedPayload(key, plaintext) {
  // returns { ciphertextBase64, ivBase64 }
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);
  return crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded).then((ct) => ({
    ciphertextBase64: arrayBufferToBase64(ct),
    ivBase64: arrayBufferToBase64(iv)
  }));
}

export function decryptPayload(key, ciphertextBase64, ivBase64) {
  const ct = base64ToArrayBuffer(ciphertextBase64);
  const iv = base64ToArrayBuffer(ivBase64);
  return crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct).then((pt) => new TextDecoder().decode(pt));
}
