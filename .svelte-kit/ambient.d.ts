
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/private';
 * 
 * console.log(ENVIRONMENT); // => "production"
 * console.log(PUBLIC_BASE_URL); // => throws error during build
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/private' {
	export const SVELTEKIT_FORK: string;
	export const NODE_ENV: string;
	export const TERM_PROGRAM: string;
	export const DOCKER_HTTPS_PROXY: string;
	export const npm_node_execpath: string;
	export const DEBIAN_FRONTEND: string;
	export const npm_config_global_ignore_file: string;
	export const MAIL: string;
	export const npm_config_global_prefix: string;
	export const CLOUDSDK_PROXY_ADDRESS: string;
	export const SANDBOX_RUNTIME: string;
	export const PATH: string;
	export const npm_config_noproxy: string;
	export const npm_config_allow_scripts: string;
	export const XDG_RUNTIME_DIR: string;
	export const FC_FONTATIONS: string;
	export const npm_execpath: string;
	export const npm_config_user_agent: string;
	export const http_proxy: string;
	export const XDG_SESSION_ID: string;
	export const XDG_VTNR: string;
	export const OLDPWD: string;
	export const HTTP_PROXY: string;
	export const GIT_EDITOR: string;
	export const GIT_MERGE_AUTOEDIT: string;
	export const SHLVL: string;
	export const npm_lifecycle_event: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const NO_PROXY: string;
	export const CLAUDE_TMPDIR: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const FTP_PROXY: string;
	export const PWD: string;
	export const XCURSOR_SIZE: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const npm_config_prefix: string;
	export const CLAUDE_CODE_HOST_HTTP_PROXY_PORT: string;
	export const ALL_PROXY: string;
	export const GRPC_PROXY: string;
	export const HTTPS_PROXY: string;
	export const CLAUDE_CODE_HOST_SOCKS_PROXY_PORT: string;
	export const WAYLAND_DISPLAY: string;
	export const npm_config_globalconfig: string;
	export const npm_config_local_prefix: string;
	export const GIT_SSH_COMMAND: string;
	export const COLOR: string;
	export const GIT_ASKPASS: string;
	export const VSCODE_PYTHON_AUTOACTIVATE_GUARD: string;
	export const XDG_SESSION_TYPE: string;
	export const npm_config_init_module: string;
	export const grpc_proxy: string;
	export const LOGNAME: string;
	export const npm_command: string;
	export const PYTHON_BASIC_REPL: string;
	export const XCURSOR_THEME: string;
	export const npm_config_userconfig: string;
	export const VSSCRIPT_PATH: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const npm_package_json: string;
	export const ELECTRON_RUN_AS_NODE: string;
	export const no_proxy: string;
	export const all_proxy: string;
	export const RSYNC_PROXY: string;
	export const COLORTERM: string;
	export const NODE: string;
	export const AI_AGENT: string;
	export const CLOUDSDK_PROXY_PORT: string;
	export const npm_config_cache: string;
	export const NO_AT_BRIDGE: string;
	export const npm_config_node_gyp: string;
	export const SHELL: string;
	export const npm_config_npm_version: string;
	export const HISTCONTROL: string;
	export const https_proxy: string;
	export const TERM_PROGRAM_VERSION: string;
	export const PYTHONSTARTUP: string;
	export const TERM: string;
	export const GDK_BACKEND: string;
	export const COPILOT_DEBUG_NONCE: string;
	export const ftp_proxy: string;
	export const HOME: string;
	export const LANG: string;
	export const XDG_SEAT: string;
	export const npm_package_version: string;
	export const COPILOT_AGENT: string;
	export const npm_lifecycle_script: string;
	export const MOTD_SHOWN: string;
	export const STARSHIP_SHELL: string;
	export const DOCKER_HTTP_PROXY: string;
	export const TMPDIR: string;
	export const _: string;
	export const NIRI_SOCKET: string;
	export const DEBUGINFOD_URLS: string;
	export const INIT_CWD: string;
	export const CHROME_DESKTOP: string;
	export const STARSHIP_SESSION_KEY: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const XDG_SESSION_CLASS: string;
	export const npm_package_name: string;
	export const CLOUDSDK_PROXY_TYPE: string;
	export const USER: string;
	export const EDITOR: string;
	export const GIT_PAGER: string;
}

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';
 * 
 * console.log(ENVIRONMENT); // => throws error during build
 * console.log(PUBLIC_BASE_URL); // => "http://site.com"
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/public' {
	export const PUBLIC_SUPABASE_URL: string;
	export const PUBLIC_SUPABASE_ANON_KEY: string;
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * 
 * console.log(env.ENVIRONMENT); // => "production"
 * console.log(env.PUBLIC_BASE_URL); // => undefined
 * ```
 */
declare module '$env/dynamic/private' {
	export const env: {
		SVELTEKIT_FORK: string;
		NODE_ENV: string;
		TERM_PROGRAM: string;
		DOCKER_HTTPS_PROXY: string;
		npm_node_execpath: string;
		DEBIAN_FRONTEND: string;
		npm_config_global_ignore_file: string;
		MAIL: string;
		npm_config_global_prefix: string;
		CLOUDSDK_PROXY_ADDRESS: string;
		SANDBOX_RUNTIME: string;
		PATH: string;
		npm_config_noproxy: string;
		npm_config_allow_scripts: string;
		XDG_RUNTIME_DIR: string;
		FC_FONTATIONS: string;
		npm_execpath: string;
		npm_config_user_agent: string;
		http_proxy: string;
		XDG_SESSION_ID: string;
		XDG_VTNR: string;
		OLDPWD: string;
		HTTP_PROXY: string;
		GIT_EDITOR: string;
		GIT_MERGE_AUTOEDIT: string;
		SHLVL: string;
		npm_lifecycle_event: string;
		VSCODE_GIT_IPC_HANDLE: string;
		NO_PROXY: string;
		CLAUDE_TMPDIR: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		FTP_PROXY: string;
		PWD: string;
		XCURSOR_SIZE: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		npm_config_prefix: string;
		CLAUDE_CODE_HOST_HTTP_PROXY_PORT: string;
		ALL_PROXY: string;
		GRPC_PROXY: string;
		HTTPS_PROXY: string;
		CLAUDE_CODE_HOST_SOCKS_PROXY_PORT: string;
		WAYLAND_DISPLAY: string;
		npm_config_globalconfig: string;
		npm_config_local_prefix: string;
		GIT_SSH_COMMAND: string;
		COLOR: string;
		GIT_ASKPASS: string;
		VSCODE_PYTHON_AUTOACTIVATE_GUARD: string;
		XDG_SESSION_TYPE: string;
		npm_config_init_module: string;
		grpc_proxy: string;
		LOGNAME: string;
		npm_command: string;
		PYTHON_BASIC_REPL: string;
		XCURSOR_THEME: string;
		npm_config_userconfig: string;
		VSSCRIPT_PATH: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		npm_package_json: string;
		ELECTRON_RUN_AS_NODE: string;
		no_proxy: string;
		all_proxy: string;
		RSYNC_PROXY: string;
		COLORTERM: string;
		NODE: string;
		AI_AGENT: string;
		CLOUDSDK_PROXY_PORT: string;
		npm_config_cache: string;
		NO_AT_BRIDGE: string;
		npm_config_node_gyp: string;
		SHELL: string;
		npm_config_npm_version: string;
		HISTCONTROL: string;
		https_proxy: string;
		TERM_PROGRAM_VERSION: string;
		PYTHONSTARTUP: string;
		TERM: string;
		GDK_BACKEND: string;
		COPILOT_DEBUG_NONCE: string;
		ftp_proxy: string;
		HOME: string;
		LANG: string;
		XDG_SEAT: string;
		npm_package_version: string;
		COPILOT_AGENT: string;
		npm_lifecycle_script: string;
		MOTD_SHOWN: string;
		STARSHIP_SHELL: string;
		DOCKER_HTTP_PROXY: string;
		TMPDIR: string;
		_: string;
		NIRI_SOCKET: string;
		DEBUGINFOD_URLS: string;
		INIT_CWD: string;
		CHROME_DESKTOP: string;
		STARSHIP_SESSION_KEY: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		XDG_SESSION_CLASS: string;
		npm_package_name: string;
		CLOUDSDK_PROXY_TYPE: string;
		USER: string;
		EDITOR: string;
		GIT_PAGER: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://example.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.ENVIRONMENT); // => undefined, not public
 * console.log(env.PUBLIC_BASE_URL); // => "http://example.com"
 * ```
 * 
 * ```
 * 
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		PUBLIC_SUPABASE_URL: string;
		PUBLIC_SUPABASE_ANON_KEY: string;
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
