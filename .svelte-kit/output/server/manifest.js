export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "Notes/_app",
	assets: new Set(["favicon.ico","icon-192.png","icon-512-maskable.png","icon-512.png","manifest.webmanifest"]),
	mimeTypes: {".png":"image/png",".webmanifest":"application/manifest+json"},
	_: {
		client: {start:"_app/immutable/entry/start.BgsuGGgA.js",app:"_app/immutable/entry/app.CJoL6zVB.js",imports:["_app/immutable/entry/start.BgsuGGgA.js","_app/immutable/chunks/COzPEhiZ.js","_app/immutable/chunks/DuT5APBI.js","_app/immutable/entry/app.CJoL6zVB.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/COzPEhiZ.js","_app/immutable/chunks/DuT5APBI.js","_app/immutable/chunks/CAa3UhLx.js","_app/immutable/chunks/GplAgDBg.js","_app/immutable/chunks/ncK4pFO5.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/notes",
				pattern: /^\/notes\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/unlock",
				pattern: /^\/unlock\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
