import { w as writable } from "./index.js";
function createEncryptionStore() {
  const { subscribe, set, update } = writable(null);
  return {
    subscribe,
    set,
    update,
    clear: () => set(null)
  };
}
createEncryptionStore();
