

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.CbQvhyiv.js","_app/immutable/chunks/B2QSKqcC.js","_app/immutable/chunks/Y4urnUXa.js"];
export const stylesheets = ["_app/immutable/assets/0.j-lJfYRo.css"];
export const fonts = [];
