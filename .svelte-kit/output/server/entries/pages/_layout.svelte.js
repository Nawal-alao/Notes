import { c as create_ssr_component, v as validate_component, b as each, e as escape } from "../../chunks/ssr.js";
import { w as writable } from "../../chunks/index.js";
import { C as Circle_check, T as Triangle_alert, I as Info } from "../../chunks/triangle-alert.js";
import { I as Icon } from "../../chunks/Icon.js";
const toasts = writable([]);
const X = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M18 6 6 18" }], ["path", { "d": "m6 6 12 12" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "x" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ordered;
  let items = [];
  toasts.subscribe((value) => items = value);
  ordered = [...items].reverse();
  return `<div class="toast-container pointer-events-none">${each(ordered, (toast) => {
    return `<div class="toast-item pointer-events-auto rounded-2xl border p-4 pr-3 shadow-2xl shadow-black/30 bg-slate-950/95 border-white/10 flex items-start gap-3"><div class="mt-0.5 text-slate-300">${toast.type === "success" ? `${validate_component(Circle_check, "CheckCircle2").$$render($$result, { class: "w-5 h-5" }, {}, {})}` : `${toast.type === "error" ? `${validate_component(Triangle_alert, "AlertTriangle").$$render($$result, { class: "w-5 h-5 text-rose-400" }, {}, {})}` : `${validate_component(Info, "Info").$$render($$result, { class: "w-5 h-5" }, {}, {})}`}`}</div> <div class="flex-1 text-sm text-slate-100 leading-relaxed">${escape(toast.message)}</div> <button class="text-slate-400 hover:text-white transition" aria-label="Fermer la notification">${validate_component(X, "X").$$render($$result, { class: "w-4 h-4" }, {}, {})}</button> </div>`;
  })}</div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${slots.default ? slots.default({}) : ``} ${validate_component(Toast, "Toast").$$render($$result, {}, {}, {})}`;
});
export {
  Layout as default
};
