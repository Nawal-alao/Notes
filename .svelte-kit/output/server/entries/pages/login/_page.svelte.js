import { c as create_ssr_component, v as validate_component, d as add_attribute } from "../../../chunks/ssr.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { L as Lock } from "../../../chunks/supabase.js";
import { S as Shield_check, a as Sparkles } from "../../../chunks/sparkles.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { E as Eye, A as Arrow_right } from "../../../chunks/eye.js";
const Mail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"
      }
    ],
    [
      "rect",
      {
        "x": "2",
        "y": "4",
        "width": "20",
        "height": "16",
        "rx": "2"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "mail" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  let password = "";
  return `${$$result.head += `<!-- HEAD_svelte-4mrp25_START -->${$$result.title = `<title>Connexion · Private Notes</title>`, ""}<!-- HEAD_svelte-4mrp25_END -->`, ""} <div class="relative flex min-h-screen items-center justify-center p-4 overflow-hidden"> <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div> <div class="absolute bottom-1/4 left-1/3 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-[100px] pointer-events-none"></div> <div class="relative w-full max-w-md rounded-3xl glass-panel p-8 md:p-10 shadow-2xl shadow-black/50 border border-white/10"> <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-6">${validate_component(Shield_check, "ShieldCheck").$$render($$result, { class: "w-3.5 h-3.5" }, {}, {})} <span data-svelte-h="svelte-15egu1u">Espace Chiffré</span></div> <div class="mb-8 space-y-2"><h1 class="text-3xl font-bold tracking-tight text-white flex items-center gap-2">Bienvenue ${validate_component(Sparkles, "Sparkles").$$render(
    $$result,
    {
      class: "w-5 h-5 text-cyan-400 animate-pulse"
    },
    {},
    {}
  )}</h1> <p class="text-sm text-slate-400 leading-relaxed" data-svelte-h="svelte-146e19v">Connectez-vous pour accéder à votre coffre-fort de notes privées chiffrées de bout en bout.</p></div> <form class="space-y-5"> <div class="space-y-1.5"><label for="email-input" class="block text-xs font-medium uppercase tracking-wider text-slate-300" data-svelte-h="svelte-12omq1b">Adresse e-mail</label> <div class="relative"><div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">${validate_component(Mail, "Mail").$$render($$result, { class: "w-4 h-4" }, {}, {})}</div> <input id="email-input" type="email" required class="w-full pl-10 pr-4 py-3 rounded-2xl glass-input text-slate-100 placeholder-slate-500 text-sm outline-none transition focus:border-cyan-400/80" placeholder="votre@email.com"${add_attribute("value", email, 0)}></div></div>  <div class="space-y-1.5"><label for="password-input" class="block text-xs font-medium uppercase tracking-wider text-slate-300" data-svelte-h="svelte-js5hok">Mot de passe du compte</label> <div class="relative"><div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">${validate_component(Lock, "Lock").$$render($$result, { class: "w-4 h-4" }, {}, {})}</div> ${`<input id="password-input" type="password" required minlength="6" class="w-full pl-10 pr-10 py-3 rounded-2xl glass-input text-slate-100 placeholder-slate-500 text-sm outline-none transition focus:border-cyan-400/80" placeholder="••••••••••••"${add_attribute("value", password, 0)}>`} <button type="button" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition">${`${validate_component(Eye, "Eye").$$render($$result, { class: "w-4 h-4" }, {}, {})}`}</button></div></div>  <div class="pt-2 space-y-3"><button type="submit" ${""} class="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3.5 font-semibold text-slate-950 text-sm transition-all duration-300 hover:opacity-95 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"><div class="flex items-center justify-center gap-2">${`<span data-svelte-h="svelte-tdqgpn">Se connecter</span> ${validate_component(Arrow_right, "ArrowRight").$$render(
    $$result,
    {
      class: "w-4 h-4 transition-transform group-hover:translate-x-1"
    },
    {},
    {}
  )}`}</div></button> <button type="button" ${""} class="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 font-medium text-slate-300 text-sm hover:bg-white/[0.08] hover:text-white transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50">Créer un nouveau compte</button></div></form> ${``} <div class="mt-8 pt-6 border-t border-white/5 text-center" data-svelte-h="svelte-c98fx7"><p class="text-[11px] text-slate-500 leading-relaxed">Ce mot de passe protège l&#39;accès au compte Supabase. Votre phrase de passe maître pour le déchiffrement sera demandée à la étape suivante.</p></div></div></div>`;
});
export {
  Page as default
};
