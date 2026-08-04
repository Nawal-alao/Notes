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
  // note: expected shape { id?, user_id, title (base64), title_iv, encrypted_content (base64), content_iv (base64), tags, history }
  try {
    if (note.id) {
      // fetch existing server row to merge history safely server-side
      const existingRes = await supabase.from('notes').select('*').eq('id', note.id).single();
      if (existingRes.error && existingRes.status !== 406) {
        // 406 may mean not found
        // proceed to upsert directly
      }

      const existing = existingRes.data || null;

      // normalize incoming history entries: ensure timestamps
      const incomingHistory = Array.isArray(note.history) ? note.history.map(h => ({
        encrypted_content: h.encrypted_content,
        content_iv: h.content_iv,
        title: h.title,
        title_iv: h.title_iv,
        updated_at: h.updated_at || new Date().toISOString()
      })) : [];

      const prevEntry = existing && existing.encrypted_content ? [{
        encrypted_content: existing.encrypted_content,
        content_iv: existing.content_iv,
        title: existing.title,
        title_iv: existing.title_iv,
        updated_at: existing.updated_at || new Date().toISOString()
      }] : [];

      const merged = [...incomingHistory, ...prevEntry, ...(existing && Array.isArray(existing.history) ? existing.history : [])].slice(0, 20);

      const payload = { ...note, history: merged };

      const { data, error } = await supabase.from('notes').upsert(payload).select().single();
      if (error) {
        // If history column doesn't exist, retry without history
        if (error.message && error.message.toLowerCase().includes('column')) {
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

    // no id: create new note
    const payload = { ...note };
    if (!payload.history) payload.history = Array.isArray(note.history) ? note.history.slice(0,20) : [];
    const { data, error } = await supabase.from('notes').upsert(payload).select().single();
    if (error) {
      if (error.message && error.message.toLowerCase().includes('column') && payload.history) {
        const copy = { ...payload };
        delete copy.history;
        const r = await supabase.from('notes').upsert(copy).select().single();
        if (r.error) throw r.error;
        return r.data;
      }
      throw error;
    }
    return data;
  } catch (err) {
    throw err;
  }
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
