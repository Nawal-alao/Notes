import { writable } from 'svelte/store';

function createEncryptionStore() {
  const { subscribe, set, update } = writable(null);

  return {
    subscribe,
    set,
    update,
    clear: () => set(null)
  };
}

export const encryptionStore = createEncryptionStore();

export function arrayBufferToBase64(buffer) {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }

  return btoa(binary);
}

export function base64ToArrayBuffer(base64) {
  const cleaned = base64.replace(/\s+/g, '');
  const padded = cleaned + '='.repeat((4 - (cleaned.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

function stringToUint8Array(str) {
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i += 1) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}

function hexToUint8Array(hex) {
  const normalized = hex.replace(/^0x/, '').replace(/\\/g, '').replace(/x/g, '');
  const bytes = new Uint8Array(normalized.length / 2);
  for (let i = 0; i < normalized.length; i += 2) {
    bytes[i / 2] = parseInt(normalized.slice(i, i + 2), 16);
  }
  return bytes;
}

function isBase64String(str) {
  const cleaned = str.replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/');
  return /^[A-Za-z0-9+/]+={0,2}$/.test(cleaned);
}

export function parseLegacyEncryptedString(value) {
  if (!value) return null;
  if (typeof value !== 'string') {
    throw new TypeError('Encrypted value must be a string');
  }

  const trimmed = value.trim();

  // Try standard/base64-compatible string first.
  if (isBase64String(trimmed)) {
    try {
      return base64ToArrayBuffer(trimmed);
    } catch (error) {
      // fallback to other decoding methods below
    }
  }

  // old legacy hex-escaped strings like "\x6f5555..."
  if (/^(?:\\x[0-9A-Fa-f]{2})+$/.test(trimmed)) {
    return hexToUint8Array(trimmed.replace(/\\x/g, ''));
  }

  // pure hex strings saved as text.
  const potentialHex = trimmed.replace(/^0x/, '');
  if (/^[0-9A-Fa-f]+$/.test(potentialHex) && potentialHex.length % 2 === 0) {
    return hexToUint8Array(potentialHex);
  }

  // Fallback: assume raw byte string stored in text.
  return stringToUint8Array(trimmed);
}

export async function deriveKey(passphrase, salt) {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey('raw', encoder.encode(passphrase), 'PBKDF2', false, ['deriveKey']);

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 600_000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptNote(key, plaintext) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
  return { ciphertext, iv };
}

export async function decryptNote(key, ciphertext, iv) {
  const plaintextBuffer = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
  return new TextDecoder().decode(plaintextBuffer);
}
