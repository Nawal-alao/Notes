
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
	export const SHELL: string;
	export const npm_command: string;
	export const npm_config_userconfig: string;
	export const COLORTERM: string;
	export const npm_config_cache: string;
	export const HISTCONTROL: string;
	export const no_proxy: string;
	export const TERM_PROGRAM_VERSION: string;
	export const COPILOT_DEBUG_NONCE: string;
	export const AI_AGENT: string;
	export const NODE: string;
	export const VSSCRIPT_PATH: string;
	export const GIT_SSH_COMMAND: string;
	export const grpc_proxy: string;
	export const ELECTRON_RUN_AS_NODE: string;
	export const COLOR: string;
	export const npm_config_local_prefix: string;
	export const CLAUDE_CODE_HOST_SOCKS_PROXY_PORT: string;
	export const NO_AT_BRIDGE: string;
	export const npm_config_globalconfig: string;
	export const XCURSOR_SIZE: string;
	export const EDITOR: string;
	export const XDG_SEAT: string;
	export const PWD: string;
	export const LOGNAME: string;
	export const XDG_SESSION_TYPE: string;
	export const npm_config_init_module: string;
	export const _: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const ftp_proxy: string;
	export const MOTD_SHOWN: string;
	export const HOME: string;
	export const CLOUDSDK_PROXY_TYPE: string;
	export const LANG: string;
	export const CLOUDSDK_PROXY_PORT: string;
	export const npm_package_version: string;
	export const PYTHONSTARTUP: string;
	export const STARSHIP_SHELL: string;
	export const WAYLAND_DISPLAY: string;
	export const DOCKER_HTTP_PROXY: string;
	export const TMPDIR: string;
	export const GIT_ASKPASS: string;
	export const https_proxy: string;
	export const NIRI_SOCKET: string;
	export const INIT_CWD: string;
	export const CHROME_DESKTOP: string;
	export const STARSHIP_SESSION_KEY: string;
	export const CLAUDE_TMPDIR: string;
	export const npm_lifecycle_script: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const VSCODE_PYTHON_AUTOACTIVATE_GUARD: string;
	export const npm_config_npm_version: string;
	export const XDG_SESSION_CLASS: string;
	export const TERM: string;
	export const npm_package_name: string;
	export const PYTHON_BASIC_REPL: string;
	export const npm_config_prefix: string;
	export const USER: string;
	export const GIT_PAGER: string;
	export const NO_PROXY: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const FTP_PROXY: string;
	export const RSYNC_PROXY: string;
	export const npm_lifecycle_event: string;
	export const SHLVL: string;
	export const GIT_MERGE_AUTOEDIT: string;
	export const GIT_EDITOR: string;
	export const HTTPS_PROXY: string;
	export const HTTP_PROXY: string;
	export const XDG_VTNR: string;
	export const XDG_SESSION_ID: string;
	export const http_proxy: string;
	export const npm_config_user_agent: string;
	export const GRPC_PROXY: string;
	export const npm_execpath: string;
	export const FC_FONTATIONS: string;
	export const XDG_RUNTIME_DIR: string;
	export const ALL_PROXY: string;
	export const DEBUGINFOD_URLS: string;
	export const npm_package_json: string;
	export const COPILOT_AGENT: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const XCURSOR_THEME: string;
	export const GDK_BACKEND: string;
	export const all_proxy: string;
	export const npm_config_allow_scripts: string;
	export const npm_config_noproxy: string;
	export const PATH: string;
	export const npm_config_node_gyp: string;
	export const SANDBOX_RUNTIME: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const CLOUDSDK_PROXY_ADDRESS: string;
	export const npm_config_global_prefix: string;
	export const MAIL: string;
	export const CLAUDE_CODE_HOST_HTTP_PROXY_PORT: string;
	export const npm_config_global_ignore_file: string;
	export const DEBIAN_FRONTEND: string;
	export const npm_node_execpath: string;
	export const OLDPWD: string;
	export const DOCKER_HTTPS_PROXY: string;
	export const TERM_PROGRAM: string;
	export const NODE_ENV: string;
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
		SHELL: string;
		npm_command: string;
		npm_config_userconfig: string;
		COLORTERM: string;
		npm_config_cache: string;
		HISTCONTROL: string;
		no_proxy: string;
		TERM_PROGRAM_VERSION: string;
		COPILOT_DEBUG_NONCE: string;
		AI_AGENT: string;
		NODE: string;
		VSSCRIPT_PATH: string;
		GIT_SSH_COMMAND: string;
		grpc_proxy: string;
		ELECTRON_RUN_AS_NODE: string;
		COLOR: string;
		npm_config_local_prefix: string;
		CLAUDE_CODE_HOST_SOCKS_PROXY_PORT: string;
		NO_AT_BRIDGE: string;
		npm_config_globalconfig: string;
		XCURSOR_SIZE: string;
		EDITOR: string;
		XDG_SEAT: string;
		PWD: string;
		LOGNAME: string;
		XDG_SESSION_TYPE: string;
		npm_config_init_module: string;
		_: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		ftp_proxy: string;
		MOTD_SHOWN: string;
		HOME: string;
		CLOUDSDK_PROXY_TYPE: string;
		LANG: string;
		CLOUDSDK_PROXY_PORT: string;
		npm_package_version: string;
		PYTHONSTARTUP: string;
		STARSHIP_SHELL: string;
		WAYLAND_DISPLAY: string;
		DOCKER_HTTP_PROXY: string;
		TMPDIR: string;
		GIT_ASKPASS: string;
		https_proxy: string;
		NIRI_SOCKET: string;
		INIT_CWD: string;
		CHROME_DESKTOP: string;
		STARSHIP_SESSION_KEY: string;
		CLAUDE_TMPDIR: string;
		npm_lifecycle_script: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		VSCODE_PYTHON_AUTOACTIVATE_GUARD: string;
		npm_config_npm_version: string;
		XDG_SESSION_CLASS: string;
		TERM: string;
		npm_package_name: string;
		PYTHON_BASIC_REPL: string;
		npm_config_prefix: string;
		USER: string;
		GIT_PAGER: string;
		NO_PROXY: string;
		VSCODE_GIT_IPC_HANDLE: string;
		FTP_PROXY: string;
		RSYNC_PROXY: string;
		npm_lifecycle_event: string;
		SHLVL: string;
		GIT_MERGE_AUTOEDIT: string;
		GIT_EDITOR: string;
		HTTPS_PROXY: string;
		HTTP_PROXY: string;
		XDG_VTNR: string;
		XDG_SESSION_ID: string;
		http_proxy: string;
		npm_config_user_agent: string;
		GRPC_PROXY: string;
		npm_execpath: string;
		FC_FONTATIONS: string;
		XDG_RUNTIME_DIR: string;
		ALL_PROXY: string;
		DEBUGINFOD_URLS: string;
		npm_package_json: string;
		COPILOT_AGENT: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		XCURSOR_THEME: string;
		GDK_BACKEND: string;
		all_proxy: string;
		npm_config_allow_scripts: string;
		npm_config_noproxy: string;
		PATH: string;
		npm_config_node_gyp: string;
		SANDBOX_RUNTIME: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		CLOUDSDK_PROXY_ADDRESS: string;
		npm_config_global_prefix: string;
		MAIL: string;
		CLAUDE_CODE_HOST_HTTP_PROXY_PORT: string;
		npm_config_global_ignore_file: string;
		DEBIAN_FRONTEND: string;
		npm_node_execpath: string;
		OLDPWD: string;
		DOCKER_HTTPS_PROXY: string;
		TERM_PROGRAM: string;
		NODE_ENV: string;
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
