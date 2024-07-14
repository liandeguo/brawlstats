

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/account/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.BxmxNdf8.js","_app/immutable/chunks/scheduler.Cewbzyqj.js","_app/immutable/chunks/index.y7AIfY8a.js","_app/immutable/chunks/stores.DDFwjYJH.js","_app/immutable/chunks/entry.BxLefGgT.js"];
export const stylesheets = ["_app/immutable/assets/3.DKa6yCR5.css"];
export const fonts = [];
