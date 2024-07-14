

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.0g4itrrc.js","_app/immutable/chunks/scheduler.Cewbzyqj.js","_app/immutable/chunks/index.y7AIfY8a.js"];
export const stylesheets = ["_app/immutable/assets/0.yJL9Svx_.css"];
export const fonts = [];
