import { c as create_ssr_component, b as add_attribute, e as escape } from "../../../chunks/ssr.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import "../../../chunks/supabase.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  return `${$$result.head += `<!-- HEAD_svelte-1q4weaa_START -->${$$result.title = `<title>Connexion · Notes privées</title>`, ""}<!-- HEAD_svelte-1q4weaa_END -->`, ""} <div class="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_45%)] px-4"><div class="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/30 backdrop-blur"><div class="mb-8 space-y-2" data-svelte-h="svelte-1xr0suq"><p class="text-sm uppercase tracking-[0.35em] text-cyan-400">Private Notes</p> <h1 class="text-3xl font-semibold">Accédez à votre espace sécurisé</h1> <p class="text-sm text-slate-400">Un magic link vous connecte, puis vous déverrouillez vos notes avec votre phrase de passe maître.</p></div> <form class="space-y-4"><label class="block text-sm text-slate-300">Adresse e-mail
        <input type="email" required class="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none ring-0 transition focus:border-cyan-400" placeholder="vous@example.com"${add_attribute("value", email)}></label> <button type="submit" ${""} class="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">${escape("Recevoir un magic link")}</button></form> ${``}</div></div>`;
});
export {
  Page as default
};
