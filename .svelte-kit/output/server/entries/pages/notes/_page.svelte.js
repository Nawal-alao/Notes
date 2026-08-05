import { n as noop, c as create_ssr_component, v as validate_component, f as createEventDispatcher, e as escape, b as each, m as missing_component, s as subscribe, d as add_attribute } from "../../../chunks/ssr.js";
import { T as Triangle_alert, C as Circle_check, I as Info } from "../../../chunks/triangle-alert.js";
import { I as Icon } from "../../../chunks/Icon.js";
import "../../../chunks/encryption.js";
import { L as Lock } from "../../../chunks/supabase.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { w as writable } from "../../../chunks/index.js";
import { S as Shield_check, a as Sparkles } from "../../../chunks/sparkles.js";
const is_client = typeof window !== "undefined";
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
const tasks = /* @__PURE__ */ new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0) raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0) raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
const Clock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["path", { "d": "M12 6v6l4 2" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "clock" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const File_down = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
      }
    ],
    ["path", { "d": "M14 2v5a1 1 0 0 0 1 1h5" }],
    ["path", { "d": "M12 18v-6" }],
    ["path", { "d": "m9 15 3 3 3-3" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "file-down" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const File_text = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
      }
    ],
    ["path", { "d": "M14 2v5a1 1 0 0 0 1 1h5" }],
    ["path", { "d": "M10 9H8" }],
    ["path", { "d": "M16 13H8" }],
    ["path", { "d": "M16 17H8" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "file-text" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Folder_open = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "folder-open" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Folder = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "folder" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Inbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "polyline",
      {
        "points": "22 12 16 12 14 15 10 15 8 12 2 12"
      }
    ],
    [
      "path",
      {
        "d": "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "inbox" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Layers = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"
      }
    ],
    [
      "path",
      {
        "d": "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"
      }
    ],
    [
      "path",
      {
        "d": "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "layers" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Pencil = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
      }
    ],
    ["path", { "d": "m15 5 4 4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "pencil" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Plus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M5 12h14" }], ["path", { "d": "M12 5v14" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "plus" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "m21 21-4.34-4.34" }],
    ["circle", { "cx": "11", "cy": "11", "r": "8" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "search" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Tag = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"
      }
    ],
    [
      "circle",
      {
        "cx": "7.5",
        "cy": "7.5",
        "r": ".5",
        "fill": "currentColor"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "tag" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Trash_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M10 11v6" }],
    ["path", { "d": "M14 11v6" }],
    [
      "path",
      {
        "d": "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"
      }
    ],
    ["path", { "d": "M3 6h18" }],
    [
      "path",
      {
        "d": "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "trash-2" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ConfirmDialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open = false } = $$props;
  let { title = "Confirmer" } = $$props;
  let { message = "" } = $$props;
  let { confirmLabel = "Confirmer" } = $$props;
  let { cancelLabel = "Annuler" } = $$props;
  let { variant = "info" } = $$props;
  createEventDispatcher();
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.message === void 0 && $$bindings.message && message !== void 0) $$bindings.message(message);
  if ($$props.confirmLabel === void 0 && $$bindings.confirmLabel && confirmLabel !== void 0) $$bindings.confirmLabel(confirmLabel);
  if ($$props.cancelLabel === void 0 && $$bindings.cancelLabel && cancelLabel !== void 0) $$bindings.cancelLabel(cancelLabel);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
  return `${open ? `<div class="fixed inset-0 z-50 flex items-center justify-center modal-backdrop p-4"><div class="modal-panel w-full max-w-sm rounded-3xl p-6 space-y-5 shadow-2xl shadow-black/30"><div class="flex items-start gap-3"><div class="mt-1 text-cyan-300">${variant === "error" ? `${validate_component(Triangle_alert, "AlertTriangle").$$render($$result, { class: "w-6 h-6 text-rose-400" }, {}, {})}` : `${variant === "success" ? `${validate_component(Circle_check, "CheckCircle2").$$render($$result, { class: "w-6 h-6 text-emerald-400" }, {}, {})}` : `${validate_component(Info, "Info").$$render($$result, { class: "w-6 h-6" }, {}, {})}`}`}</div> <div><h3 class="text-lg font-semibold text-white">${escape(title)}</h3> <p class="mt-1 text-sm leading-relaxed text-slate-300">${escape(message)}</p></div></div> <div class="flex items-center justify-end gap-3 pt-2"><button type="button" class="px-4 py-2 rounded-2xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.05] transition">${escape(cancelLabel)}</button> <button type="button" class="px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-semibold transition hover:opacity-95">${escape(confirmLabel)}</button></div></div></div>` : ``}`;
});
const FolderList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { folders = [] } = $$props;
  let { selected = "all" } = $$props;
  let dragOverId = null;
  let isDeleteConfirmOpen = false;
  function getFolderIcon(id) {
    if (id === "all") return Layers;
    if (id === "uncat") return Inbox;
    return Tag;
  }
  if ($$props.folders === void 0 && $$bindings.folders && folders !== void 0) $$bindings.folders(folders);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0) $$bindings.selected(selected);
  return `<aside class="w-64 flex-shrink-0 flex flex-col glass-panel rounded-3xl p-4 border border-white/10 shadow-2xl relative overflow-hidden"> <div class="flex items-center justify-between px-2 mb-4"><div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">${validate_component(Folder, "Folder").$$render($$result, { class: "w-4 h-4 text-cyan-400" }, {}, {})} <span data-svelte-h="svelte-4zpckp">Espaces &amp; Tags</span></div> <button class="p-1.5 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all duration-200" title="Créer un nouveau tag">${validate_component(Plus, "Plus").$$render($$result, { class: "w-4 h-4" }, {}, {})}</button></div>  <nav class="flex-1 space-y-1 overflow-y-auto pr-1">${each(folders, (f, i) => {
    let IconComponent = getFolderIcon(f.id), isSelected = selected === f.id, isDragTarget = dragOverId === f.id;
    return `   <div role="group" class="${"relative group rounded-2xl transition-all duration-200 " + escape(
      isDragTarget ? "ring-2 ring-cyan-400 bg-cyan-500/10 scale-[1.02]" : "",
      true
    )}"><button class="${"w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-left transition-all duration-200 " + escape(
      isSelected ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/10 font-semibold" : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]",
      true
    )}"><div class="flex items-center gap-3 min-w-0">${validate_component(IconComponent || missing_component, "svelte:component").$$render(
      $$result,
      {
        class: "w-4 h-4 flex-shrink-0 " + (isSelected ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300")
      },
      {},
      {}
    )} <span class="text-sm truncate font-medium">${escape(f.name)}</span></div> <div class="flex items-center gap-2"><span class="${"px-2 py-0.5 rounded-full text-xs font-semibold " + escape(
      isSelected ? "bg-cyan-500/30 text-cyan-200" : "bg-white/[0.06] text-slate-400 group-hover:text-slate-300",
      true
    )}">${escape(f.count)}</span> ${f.id !== "all" && f.id !== "uncat" ? `<div class="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity"><button class="p-1 text-slate-400 hover:text-cyan-300 hover:bg-white/10 rounded-lg transition" title="Renommer">${validate_component(Pencil, "Pencil").$$render($$result, { class: "w-3 h-3" }, {}, {})}</button> <button class="p-1 text-slate-400 hover:text-rose-400 hover:bg-white/10 rounded-lg transition" title="Supprimer">${validate_component(Trash_2, "Trash2").$$render($$result, { class: "w-3 h-3" }, {}, {})}</button> </div>` : ``} </div></button> </div>`;
  })}</nav>  ${``} ${validate_component(ConfirmDialog, "ConfirmDialog").$$render(
    $$result,
    {
      open: isDeleteConfirmOpen,
      title: "Supprimer ce tag",
      message: "Ce tag sera retiré de toutes les notes. Confirmez-vous la suppression ?",
      confirmLabel: "Supprimer",
      cancelLabel: "Annuler",
      variant: "error"
    },
    {},
    {}
  )}</aside>`;
});
function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  const now2 = /* @__PURE__ */ new Date();
  const diffSec = Math.floor((now2 - date) / 1e3);
  if (diffSec < 60) return "À l'instant";
  if (diffSec < 3600) return `Il y a ${Math.floor(diffSec / 60)} min`;
  if (diffSec < 86400) return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return date.toLocaleDateString([], { day: "2-digit", month: "short" });
}
const NoteCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { note } = $$props;
  let { index = 0 } = $$props;
  let { isSelected = false } = $$props;
  let isConfirmOpen = false;
  createEventDispatcher();
  if ($$props.note === void 0 && $$bindings.note && note !== void 0) $$bindings.note(note);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0) $$bindings.index(index);
  if ($$props.isSelected === void 0 && $$bindings.isSelected && isSelected !== void 0) $$bindings.isSelected(isSelected);
  return `<div role="button" tabindex="0" class="${"group relative w-full p-4 rounded-2xl cursor-pointer text-left transition-all duration-200 glass-card " + escape(
    isSelected ? "bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-transparent border-cyan-500/40 ring-1 ring-cyan-500/30 shadow-xl shadow-cyan-500/10" : "",
    true
  )}" draggable="true"> ${isSelected ? `<div class="absolute left-0 top-3 bottom-3 w-1 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full shadow-lg shadow-cyan-400/50"></div>` : ``} <div class="flex items-start justify-between gap-3 mb-1.5"><div class="flex items-center gap-2 min-w-0">${validate_component(File_text, "FileText").$$render(
    $$result,
    {
      class: "w-4 h-4 flex-shrink-0 " + (isSelected ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200")
    },
    {},
    {}
  )} <h4 class="text-sm font-semibold truncate text-slate-100 group-hover:text-white">${escape(note.titlePreview || note.title || "Sans titre")}</h4></div> <div class="flex items-center gap-1 text-[11px] text-slate-400 flex-shrink-0">${validate_component(Clock, "Clock").$$render($$result, { class: "w-3 h-3 text-slate-500" }, {}, {})} <span>${escape(formatDate(note.updated_at))}</span></div></div>  <p class="text-xs text-slate-400 group-hover:text-slate-300 line-clamp-2 leading-relaxed mb-3">${escape(note.preview || "Note vide…")}</p>  <div class="flex items-center justify-between text-xs pt-1 border-t border-white/[0.04]"><div class="flex items-center gap-1.5 flex-wrap min-w-0">${note.tags && note.tags.length > 0 ? `${each(note.tags.slice(0, 2), (tag) => {
    return `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">${validate_component(Tag, "Tag").$$render($$result, { class: "w-2.5 h-2.5" }, {}, {})} <span>${escape(tag)}</span> </span>`;
  })}` : `<span class="text-[11px] text-slate-600 italic" data-svelte-h="svelte-1981i8m">Sans tag</span>`}</div>  <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><button type="button" class="p-1 text-slate-400 hover:text-cyan-300 hover:bg-white/10 rounded-lg transition" title="Exporter en TXT">${validate_component(File_down, "FileDown").$$render($$result, { class: "w-3.5 h-3.5" }, {}, {})}</button> <button type="button" class="p-1 text-slate-400 hover:text-rose-400 hover:bg-white/10 rounded-lg transition" title="Supprimer la note">${validate_component(Trash_2, "Trash2").$$render($$result, { class: "w-3.5 h-3.5" }, {}, {})}</button></div></div> ${validate_component(ConfirmDialog, "ConfirmDialog").$$render(
    $$result,
    {
      open: isConfirmOpen,
      title: "Supprimer cette note",
      message: "La note sera définitivement supprimée de votre coffre-fort chiffré. Êtes-vous sûr ?",
      confirmLabel: "Supprimer",
      cancelLabel: "Annuler",
      variant: "error"
    },
    {},
    {}
  )}</div>`;
});
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring2 = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring2 - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map(
      (_, i) => tick_spring(ctx, last_value[i], current_value[i], target_value[i])
    );
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
function spring(value, opts = {}) {
  const store = writable(value);
  const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
  let last_time;
  let task;
  let current_token;
  let last_value = value;
  let target_value = value;
  let inv_mass = 1;
  let inv_mass_recovery_rate = 0;
  let cancel_task = false;
  function set(new_value, opts2 = {}) {
    target_value = new_value;
    const token = current_token = {};
    if (value == null || opts2.hard || spring2.stiffness >= 1 && spring2.damping >= 1) {
      cancel_task = true;
      last_time = now();
      last_value = new_value;
      store.set(value = target_value);
      return Promise.resolve();
    } else if (opts2.soft) {
      const rate = opts2.soft === true ? 0.5 : +opts2.soft;
      inv_mass_recovery_rate = 1 / (rate * 60);
      inv_mass = 0;
    }
    if (!task) {
      last_time = now();
      cancel_task = false;
      task = loop((now2) => {
        if (cancel_task) {
          cancel_task = false;
          task = null;
          return false;
        }
        inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
        const ctx = {
          inv_mass,
          opts: spring2,
          settled: true,
          dt: (now2 - last_time) * 60 / 1e3
        };
        const next_value = tick_spring(ctx, last_value, value, target_value);
        last_time = now2;
        last_value = value;
        store.set(value = next_value);
        if (ctx.settled) {
          task = null;
        }
        return !ctx.settled;
      });
    }
    return new Promise((fulfil) => {
      task.promise.then(() => {
        if (token === current_token) fulfil();
      });
    });
  }
  const spring2 = {
    set,
    update: (fn, opts2) => set(fn(target_value, value), opts2),
    subscribe: store.subscribe,
    stiffness,
    damping,
    precision
  };
  return spring2;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredNotesList;
  let $btnScale, $$unsubscribe_btnScale;
  const btnScale = spring(1, { stiffness: 0.25, damping: 0.5 });
  $$unsubscribe_btnScale = subscribe(btnScale, (value) => $btnScale = value);
  let notes = [];
  let folders = [];
  let selectedFolder = "all";
  let selectedNoteId = null;
  let search = "";
  let searchInputEl;
  filteredNotesList = (() => {
    let list = notes.slice().sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    return list;
  })();
  $$unsubscribe_btnScale();
  return `${$$result.head += `<!-- HEAD_svelte-1snf3hs_START -->${$$result.title = `<title>Private Notes · Workspace Chiffré</title>`, ""}<!-- HEAD_svelte-1snf3hs_END -->`, ""} <div class="flex flex-col h-screen overflow-hidden p-4 md:p-6 gap-4"> <header class="flex items-center justify-between px-6 py-3.5 glass-panel rounded-3xl border border-white/10 shadow-2xl flex-shrink-0"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/20">${validate_component(Shield_check, "ShieldCheck").$$render($$result, { class: "w-6 h-6" }, {}, {})}</div> <div data-svelte-h="svelte-11khxzw"><h1 class="text-base font-bold text-white tracking-tight leading-tight flex items-center gap-2">Private Notes
          <span class="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-semibold tracking-wider border border-cyan-500/20">v2.0 AES-256</span></h1> <p class="text-xs text-slate-400">Espace de travail chiffré de bout en bout</p></div></div>  <div class="flex items-center gap-3"><div class="relative w-64 md:w-80">${validate_component(Search, "Search").$$render(
    $$result,
    {
      class: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
    },
    {},
    {}
  )} <input placeholder="Rechercher des notes (⌘K)…" class="w-full pl-10 pr-9 py-2.5 rounded-2xl glass-input text-slate-100 placeholder-slate-500 text-xs outline-none transition focus:border-cyan-400/80"${add_attribute("this", searchInputEl, 0)}${add_attribute("value", search, 0)}> ${``}</div> <button class="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 hover:opacity-95 transition flex items-center gap-2" style="${"transform: scale(" + escape($btnScale, true) + ");"}">${validate_component(Plus, "Plus").$$render($$result, { class: "w-4 h-4" }, {}, {})} <span data-svelte-h="svelte-1crh4jc">Nouvelle note</span></button> <button class="p-2.5 rounded-2xl glass-input text-slate-400 hover:text-amber-400 hover:border-amber-400/40 transition" title="Verrouiller le coffre-fort">${validate_component(Lock, "Lock").$$render($$result, { class: "w-4 h-4" }, {}, {})}</button></div></header>  <div class="flex-1 min-h-0 flex gap-4 overflow-hidden"> ${validate_component(FolderList, "FolderList").$$render($$result, { folders, selected: selectedFolder }, {}, {})}  <div class="w-80 md:w-96 flex-shrink-0 flex flex-col glass-panel rounded-3xl p-4 border border-white/10 shadow-2xl overflow-hidden"><div class="flex items-center justify-between px-2 mb-3"><span class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">${validate_component(File_text, "FileText").$$render($$result, { class: "w-3.5 h-3.5 text-cyan-400" }, {}, {})} <span>Notes (${escape(filteredNotesList.length)})</span></span></div> <div class="flex-1 overflow-y-auto pr-1 space-y-2.5">${filteredNotesList.length > 0 ? `${each(filteredNotesList, (note, i) => {
    return `<div>${validate_component(NoteCard, "NoteCard").$$render(
      $$result,
      {
        note,
        index: i,
        isSelected: selectedNoteId === note.id
      },
      {},
      {}
    )} </div>`;
  })}` : `<div class="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-3">${validate_component(Folder_open, "FolderOpen").$$render(
    $$result,
    {
      class: "w-10 h-10 stroke-1 text-slate-600"
    },
    {},
    {}
  )} <div class="space-y-1" data-svelte-h="svelte-1vwd78j"><p class="text-sm font-semibold text-slate-400">Aucune note trouvée</p> <p class="text-xs text-slate-500">Créez votre première note chiffrée pour commencer.</p></div> <button class="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/20 transition flex items-center gap-1.5">${validate_component(Plus, "Plus").$$render($$result, { class: "w-3.5 h-3.5" }, {}, {})} <span data-svelte-h="svelte-1o74gb9">Créer une note</span></button></div>`}</div></div>  <main class="flex-1 min-w-0 h-full overflow-hidden">${`<div class="h-full glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center space-y-4"><div class="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-xl">${validate_component(Sparkles, "Sparkles").$$render($$result, { class: "w-8 h-8" }, {}, {})}</div> <div class="max-w-sm space-y-2" data-svelte-h="svelte-5rhvw3"><h3 class="text-xl font-bold text-white">Aucune note sélectionnée</h3> <p class="text-xs text-slate-400 leading-relaxed">Sélectionnez une note dans le panneau de gauche pour l&#39;éditer, ou créez un nouveau document chiffré en un clic.</p></div> <button class="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:opacity-95 transition flex items-center gap-2">${validate_component(Plus, "Plus").$$render($$result, { class: "w-4 h-4" }, {}, {})} <span data-svelte-h="svelte-l6qvde">Nouvelle note chiffrée</span></button></div>`}</main></div></div>`;
});
export {
  Page as default
};
