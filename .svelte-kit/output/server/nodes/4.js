

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/notes/_page.svelte.js')).default;
export const imports = ["entries/pages/notes/_page.svelte.js","chunks/ssr.js","chunks/triangle-alert.js","chunks/Icon.js","chunks/encryption.js","chunks/index.js","chunks/supabase.js","chunks/exports.js","chunks/utils2.js","chunks/state.svelte.js","chunks/ssr2.js","chunks/shield-check.js"];
export const stylesheets = ["_app/immutable/assets/_page.Q2gsqVYz.css"];
export const fonts = [];
