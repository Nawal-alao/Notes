import { c as create_ssr_component, b as add_attribute, e as escape } from "../../../chunks/ssr.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import "../../../chunks/supabase.js";
import "../../../chunks/encryption.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let passphrase = "";
  return `${$$result.head += `<!-- HEAD_svelte-26xo1p_START -->${$$result.title = `<title>Déverrouillage · Notes privées</title>`, ""}<!-- HEAD_svelte-26xo1p_END -->`, ""} <div class="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.14),_transparent_45%)] px-4"><div class="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/30 backdrop-blur"><div class="mb-8 space-y-2" data-svelte-h="svelte-xc4t3z"><p class="text-sm uppercase tracking-[0.35em] text-fuchsia-400">Master key</p> <h1 class="text-3xl font-semibold">Déverrouillez votre coffre</h1> <p class="text-sm text-slate-400">Votre phrase de passe maître dérive la clé de chiffrement. Elle n’est jamais stockée.</p></div> <form class="space-y-4"><label class="block text-sm text-slate-300">Phrase de passe maître
        <input type="password" required class="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none transition focus:border-fuchsia-400" placeholder="Saisissez votre phrase secrète"${add_attribute("value", passphrase)}></label> <button type="submit" ${""} class="w-full rounded-2xl bg-fuchsia-500 px-4 py-3 font-medium text-slate-950 transition hover:bg-fuchsia-400 disabled:cursor-not-allowed disabled:opacity-60">${escape("Déverrouiller")}</button></form> ${``}</div></div>`;
});
export {
  Page as default
};
