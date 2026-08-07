

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["entries/pages/_layout.svelte.js","chunks/ssr.js","chunks/index.js","chunks/triangle-alert.js","chunks/Icon.js"];
export const stylesheets = ["_app/immutable/assets/_layout.BgsM_KGF.css"];
export const fonts = [];
