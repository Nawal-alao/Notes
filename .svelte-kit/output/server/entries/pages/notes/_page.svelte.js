import { c as create_ssr_component } from "../../../chunks/ssr.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import "../../../chunks/supabase.js";
import "../../../chunks/encryption.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-vhpksz_START -->${$$result.title = `<title>Notes · Private Notes</title>`, ""}<!-- HEAD_svelte-vhpksz_END -->`, ""} <div class="flex min-h-screen items-center justify-center px-4" data-svelte-h="svelte-1o97blr"><div class="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/30"><h1 class="text-2xl font-semibold">Votre espace de notes</h1> <p class="mt-3 text-sm text-slate-400">L’éditeur et la synchronisation arrivent dans la prochaine étape. Le flux d’authentification et de déverrouillage est prêt.</p></div></div>`;
});
export {
  Page as default
};
