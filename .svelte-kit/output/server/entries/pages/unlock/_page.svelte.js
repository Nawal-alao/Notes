import { c as create_ssr_component, v as validate_component, d as add_attribute } from "../../../chunks/ssr.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { L as Lock } from "../../../chunks/supabase.js";
import "../../../chunks/encryption.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { E as Eye, A as Arrow_right } from "../../../chunks/eye.js";
const Key_round = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
      }
    ],
    [
      "circle",
      {
        "cx": "16.5",
        "cy": "7.5",
        "r": ".5",
        "fill": "currentColor"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "key-round" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Log_out = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "m16 17 5-5-5-5" }],
    ["path", { "d": "M21 12H9" }],
    [
      "path",
      {
        "d": "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "log-out" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Shield = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "shield" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let passphrase = "";
  return `${$$result.head += `<!-- HEAD_svelte-g37f1w_START -->${$$result.title = `<title>Déverrouillage · Private Notes</title>`, ""}<!-- HEAD_svelte-g37f1w_END -->`, ""} <div class="relative flex min-h-screen items-center justify-center p-4 overflow-hidden"> <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-fuchsia-500/10 rounded-full blur-[130px] pointer-events-none animate-pulse-glow"></div> <div class="absolute bottom-1/3 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div> <div class="relative w-full max-w-md rounded-3xl glass-panel p-8 md:p-10 shadow-2xl shadow-black/60 border border-white/10"> <div class="flex items-center justify-between mb-6"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-xs font-semibold tracking-wider uppercase">${validate_component(Key_round, "KeyRound").$$render($$result, { class: "w-3.5 h-3.5" }, {}, {})} <span data-svelte-h="svelte-1boba0y">Coffre Fort Scellé</span></div> <button type="button" class="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 py-1 px-2.5 rounded-lg hover:bg-white/[0.05] transition" title="Déconnexion du compte">${validate_component(Log_out, "LogOut").$$render($$result, { class: "w-3.5 h-3.5" }, {}, {})} <span data-svelte-h="svelte-6397lj">Changer de compte</span></button></div> <div class="mb-8 space-y-2"><h1 class="text-3xl font-bold tracking-tight text-white flex items-center gap-2">Déverrouiller ${validate_component(Lock, "Lock").$$render($$result, { class: "w-5 h-5 text-fuchsia-400" }, {}, {})}</h1> <p class="text-sm text-slate-400 leading-relaxed" data-svelte-h="svelte-ssgrd3">Saisissez votre phrase de passe maître. Elle dérive localement votre clé AES-GCM et n&#39;est jamais transmise au serveur.</p></div> <form class="space-y-5"><div class="space-y-1.5"><label for="passphrase-input" class="block text-xs font-medium uppercase tracking-wider text-slate-300" data-svelte-h="svelte-cow5uc">Phrase de passe maître</label> <div class="relative"><div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">${validate_component(Shield, "Shield").$$render($$result, { class: "w-4 h-4" }, {}, {})}</div> ${`<input id="passphrase-input" type="password" required class="w-full pl-10 pr-10 py-3.5 rounded-2xl glass-input text-slate-100 placeholder-slate-500 text-sm outline-none transition focus:border-fuchsia-400/80" placeholder="••••••••••••"${add_attribute("value", passphrase, 0)}>`} <button type="button" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition">${`${validate_component(Eye, "Eye").$$render($$result, { class: "w-4 h-4" }, {}, {})}`}</button></div></div> <button type="submit" ${""} class="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-fuchsia-500 to-indigo-600 px-5 py-3.5 font-semibold text-slate-950 text-sm transition-all duration-300 hover:opacity-95 hover:shadow-lg hover:shadow-fuchsia-500/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"><div class="flex items-center justify-center gap-2">${`<span data-svelte-h="svelte-160qm65">Accéder à mes notes</span> ${validate_component(Arrow_right, "ArrowRight").$$render(
    $$result,
    {
      class: "w-4 h-4 transition-transform group-hover:translate-x-1"
    },
    {},
    {}
  )}`}</div></button></form> ${``} <div class="mt-8 pt-6 border-t border-white/5 text-center" data-svelte-h="svelte-1dkc0hs"><p class="text-[11px] text-slate-500 leading-relaxed">Chiffrement Zero-Knowledge : si vous oubliez votre phrase maître, vos données restent indéchiffrables.</p></div></div></div>`;
});
export {
  Page as default
};
