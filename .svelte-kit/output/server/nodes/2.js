

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.D0Bo8G2M.js","_app/immutable/chunks/scheduler.Cewbzyqj.js","_app/immutable/chunks/index.y7AIfY8a.js"];
export const stylesheets = ["_app/immutable/assets/2.BsaI3zLt.css"];
export const fonts = [];
