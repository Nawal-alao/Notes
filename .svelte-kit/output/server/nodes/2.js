

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.DYA5Q_pA.js","_app/immutable/chunks/DSGxBBWs.js","_app/immutable/chunks/CQGF_JyJ.js","_app/immutable/chunks/BAp6MMvY.js"];
export const stylesheets = [];
export const fonts = [];
