export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","3v3.png","duo.png","favicon.png","id.png","loading_2020_arcade.png","portrait/8-bit_portrait.png","portrait/amber_portrait.png","portrait/angelo_portrait.png","portrait/ash_portrait.png","portrait/barley_portrait.png","portrait/bea_portrait.png","portrait/belle_portrait.png","portrait/berry_portrait.png","portrait/bibi_portrait.png","portrait/bo_portrait.png","portrait/bonnie_portrait.png","portrait/brock_portrait (1).png","portrait/brock_portrait.png","portrait/bull_portrait.png","portrait/buster_portrait.png","portrait/buzz_portrait.png","portrait/byron_portrait.png","portrait/carl_portrait.png","portrait/charlie_portrait.png","portrait/chester_portrait.png","portrait/chuck_portrait.png","portrait/clancy_portrait.png","portrait/colette_portrait.png","portrait/colt_portrait.png","portrait/cordelius_portrait.png","portrait/crow_portrait.png","portrait/darryl_portrait.png","portrait/doug_portrait.png","portrait/draco_portrait.png","portrait/dynamike_portrait.png","portrait/edgar_portrait.png","portrait/elprimo_portrait.png","portrait/emz_portrait.png","portrait/eve_portrait.png","portrait/fang_portrait.png","portrait/frank_portrait.png","portrait/gale_portrait.png","portrait/gene_portrait.png","portrait/gray_portrait.png","portrait/griff_portrait.png","portrait/grom_portrait.png","portrait/gus_portrait.png","portrait/hank_portrait.png","portrait/jacky_portrait.png","portrait/janet_portrait.png","portrait/jessie_portrait.png","portrait/kit_portrait.png","portrait/larry&lawrie_portrait.png","portrait/leon_portrait.png","portrait/lily_portrait.png","portrait/lola_portrait.png","portrait/lou_portrait.png","portrait/maisie_portrait.png","portrait/mandy_portrait.png","portrait/max_portrait.png","portrait/meg_portrait.png","portrait/melodie_portrait.png","portrait/mico_portrait.png","portrait/mortis_portrait.png","portrait/mr.p_portrait.png","portrait/nani_portrait.png","portrait/nita_portrait.png","portrait/otis_portrait.png","portrait/pam_portrait.png","portrait/pearl_portrait.png","portrait/penny_portrait.png","portrait/piper_portrait.png","portrait/poco_portrait.png","portrait/r-t_portrait.png","portrait/rico_portrait.png","portrait/rosa_portrait.png","portrait/ruffs_portrait.png","portrait/sam_portrait.png","portrait/sandy_portrait.png","portrait/shelly_portrait.png","portrait/spike_portrait.png","portrait/sprout_portrait.png","portrait/squeak_portrait.png","portrait/stu_portrait.png","portrait/surge_portrait.png","portrait/tara_portrait.png","portrait/tick_portrait.png","portrait/willow_portrait.png","power.png","solo.png","star.png","swords.png","trophy.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.I1ezoOwA.js","app":"_app/immutable/entry/app.D3FoCid4.js","imports":["_app/immutable/entry/start.I1ezoOwA.js","_app/immutable/chunks/entry.BxLefGgT.js","_app/immutable/chunks/scheduler.Cewbzyqj.js","_app/immutable/entry/app.D3FoCid4.js","_app/immutable/chunks/scheduler.Cewbzyqj.js","_app/immutable/chunks/index.y7AIfY8a.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/account",
				pattern: /^\/account\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
