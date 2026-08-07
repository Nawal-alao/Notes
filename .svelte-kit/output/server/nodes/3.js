

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/login/_page.svelte.js')).default;
export const imports = ["entries/pages/login/_page.svelte.js","chunks/ssr.js","chunks/exports.js","chunks/utils2.js","chunks/state.svelte.js","chunks/ssr2.js","chunks/supabase.js","chunks/Icon.js","chunks/shield-check.js","chunks/eye.js"];
export const stylesheets = [];
export const fonts = [];
