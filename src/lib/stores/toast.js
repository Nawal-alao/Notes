import { writable } from 'svelte/store';

export const toasts = writable([]);
let idCounter = 0;

export function notify({ message, type = 'info', duration = 3200 }) {
  const id = `${Date.now()}-${idCounter++}`;
  const toast = { id, message, type };
  toasts.update((items) => [toast, ...items]);

  setTimeout(() => {
    toasts.update((items) => items.filter((item) => item.id !== id));
  }, duration);
}

export function dismissToast(id) {
  toasts.update((items) => items.filter((item) => item.id !== id));
}
