import { n as noop, c as create_ssr_component, v as validate_component, f as createEventDispatcher, e as escape, b as each, d as add_attribute, m as missing_component, h as compute_rest_props, i as spread, j as escape_attribute_value, k as escape_object, s as subscribe } from "../../../chunks/ssr.js";
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
import { S as Shield_check } from "../../../chunks/shield-check.js";
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
const Chevrons_left = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m11 17-5-5 5-5" }], ["path", { "d": "m18 17-5-5 5-5" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevrons-left" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Chevrons_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m6 17 5-5-5-5" }], ["path", { "d": "m13 17 5-5-5-5" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevrons-right" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
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
const Sparkles = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
      }
    ],
    ["path", { "d": "M20 2v4" }],
    ["path", { "d": "M22 4h-4" }],
    ["circle", { "cx": "4", "cy": "20", "r": "2" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "sparkles" }, $$props, { iconNode }), {}, {
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
  return `${open ? `<div class="fixed inset-0 z-50 flex items-center justify-center modal-backdrop p-4"><div class="modal-panel w-full max-w-sm rounded-3xl p-6 space-y-5 shadow-2xl shadow-black/30"><div class="flex items-start gap-3"><div class="mt-1 text-slate-300">${variant === "error" ? `${validate_component(Triangle_alert, "AlertTriangle").$$render($$result, { class: "w-6 h-6 text-rose-400" }, {}, {})}` : `${variant === "success" ? `${validate_component(Circle_check, "CheckCircle2").$$render($$result, { class: "w-6 h-6 text-emerald-400" }, {}, {})}` : `${validate_component(Info, "Info").$$render($$result, { class: "w-6 h-6" }, {}, {})}`}`}</div> <div><h3 class="text-lg font-semibold text-white">${escape(title)}</h3> <p class="mt-1 text-sm leading-relaxed text-slate-300">${escape(message)}</p></div></div> <div class="flex items-center justify-end gap-3 pt-2"><button type="button" class="px-4 py-2 rounded-2xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.05] transition">${escape(cancelLabel)}</button> <button type="button" class="px-4 py-2 rounded-2xl btn-primary text-xs font-semibold transition">${escape(confirmLabel)}</button></div></div></div>` : ``}`;
});
const css = {
  code: ".app-sidebar.svelte-8tjmtw.svelte-8tjmtw{width:64px;flex:0 0 64px;position:relative}.rail-collapsed.svelte-8tjmtw.svelte-8tjmtw{position:relative;width:64px;height:100%}.rail-popout.svelte-8tjmtw.svelte-8tjmtw{position:absolute;left:0;top:0;width:240px;height:100%;padding:12px;background:var(--surface);border:1px solid var(--border);border-radius:12px;box-shadow:0 6px 24px rgba(0,0,0,0.45);opacity:0;pointer-events:none;transform:translateX(-64px);transition:opacity 220ms cubic-bezier(0.4,0,0.2,1), transform 220ms cubic-bezier(0.4,0,0.2,1);z-index:40}.app-sidebar.svelte-8tjmtw:hover .rail-popout.svelte-8tjmtw{opacity:1;pointer-events:auto;transform:translateX(0)}.app-sidebar.svelte-8tjmtw:hover .rail-popout[inert].svelte-8tjmtw{pointer-events:auto}.app-sidebar.svelte-8tjmtw:hover .rail-icons.svelte-8tjmtw{opacity:0;pointer-events:none}.rail-icons.svelte-8tjmtw.svelte-8tjmtw{transition:opacity 220ms ease}.badge-collapsed.svelte-8tjmtw.svelte-8tjmtw{position:absolute;right:8px;top:6px;background:rgba(255,255,255,0.04);color:var(--text);font-size:10px;padding:2px 6px;border-radius:999px}.toggle-notes-panel.svelte-8tjmtw.svelte-8tjmtw{position:relative;z-index:50}.rail-popout.svelte-8tjmtw nav.svelte-8tjmtw{max-height:calc(100vh - 140px);overflow-y:auto}",
  map: `{"version":3,"file":"FolderList.svelte","sources":["FolderList.svelte"],"sourcesContent":["<script>\\n  import { createEventDispatcher } from 'svelte';\\n  import { fly, fade, scale } from 'svelte/transition';\\n  import { Folder, Tag, Pencil, Trash2, Layers, Inbox, Plus, X, Check, ChevronsLeft, ChevronsRight } from 'lucide-svelte';\\n  import ConfirmDialog from '$lib/ConfirmDialog.svelte';\\n\\n  const dispatch = createEventDispatcher();\\n\\n  export let folders = [];\\n  export let selected = 'all';\\n  export let notesPanelOpen = true;\\n  let dragOverId = null;\\n  let railHovered = false;\\n  let railPopoutEl;\\n\\n  function handleRailMouseLeave() {\\n    railHovered = false;\\n    if (railPopoutEl?.contains(document.activeElement)) {\\n      document.activeElement.blur?.();\\n    }\\n  }\\n\\n  // Modal State for Create / Rename\\n  let isModalOpen = false;\\n  let modalMode = 'create'; // 'create' | 'rename'\\n  let targetFolderId = null;\\n  let folderNameInput = '';\\n  let isDeleteConfirmOpen = false;\\n  let deleteTargetId = null;\\n\\n  function select(id) { dispatch('select', id); }\\n  function toggleNotesPanel() { dispatch('toggle-notes-panel'); }\\n  function openCreateModal() { modalMode = 'create'; folderNameInput = ''; targetFolderId = null; isModalOpen = true; }\\n  function openRenameModal(id, currentName) { modalMode = 'rename'; folderNameInput = currentName; targetFolderId = id; isModalOpen = true; }\\n\\n  function handleModalSubmit() {\\n    if (!folderNameInput.trim()) return;\\n    if (modalMode === 'create') dispatch('create', folderNameInput.trim());\\n    else if (modalMode === 'rename' && targetFolderId) dispatch('rename', { id: targetFolderId, name: folderNameInput.trim() });\\n    isModalOpen = false;\\n  }\\n\\n  function remove(id, e) { e.stopPropagation(); deleteTargetId = id; isDeleteConfirmOpen = true; }\\n  function handleDeleteConfirm() { if (deleteTargetId) dispatch('delete', deleteTargetId); deleteTargetId = null; isDeleteConfirmOpen = false; }\\n  function handleDeleteCancel() { deleteTargetId = null; isDeleteConfirmOpen = false; }\\n\\n  function getFolderIcon(id) { if (id === 'all') return Layers; if (id === 'uncat') return Inbox; return Tag; }\\n\\n<\/script>\\n\\n<aside class=\\"app-sidebar flex-shrink-0 relative\\" on:mouseenter={() => railHovered = true} on:mouseleave={handleRailMouseLeave}>\\n  <!-- Collapsed rail (icons only) -- visible by default -->\\n  <div class=\\"rail-collapsed flex flex-col items-center py-3 gap-3\\">\\n    <div class=\\"w-10 h-10 flex items-center justify-center rounded-md\\">\\n      <Folder class=\\"w-5 h-5 text-slate-300\\" />\\n    </div>\\n      <div class=\\"rail-icons flex flex-col items-center w-full space-y-1 overflow-hidden\\">\\n        {#each folders as f (f.id)}\\n          {@const IconComponent = getFolderIcon(f.id)}\\n          <div class=\\"relative w-full flex items-center justify-center p-1\\">\\n            <button on:click={() => select(f.id)} class=\\"p-2 rounded-md text-slate-400 hover:text-white transition\\" title={f.name}>\\n              <svelte:component this={IconComponent} class=\\"w-5 h-5\\" />\\n            </button>\\n            <span class=\\"badge-collapsed\\">{f.count}</span>\\n          </div>\\n        {/each}\\n      </div>\\n      <div class=\\"rail-actions mt-auto pb-2 flex flex-col items-center gap-2\\">\\n        <button\\n          on:click={toggleNotesPanel}\\n          class=\\"toggle-notes-panel p-2 rounded-md transition text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 {notesPanelOpen ? 'bg-white/5 text-white' : 'bg-transparent'}\\"\\n          aria-pressed={notesPanelOpen}\\n          aria-label={notesPanelOpen ? 'Masquer le panneau notes' : 'Afficher le panneau notes'}\\n          title={notesPanelOpen ? 'Masquer le panneau notes (Ctrl+,)' : 'Afficher le panneau notes (Ctrl+,)'}\\n        >\\n          {#if notesPanelOpen}\\n            <ChevronsLeft class=\\"w-5 h-5\\" />\\n          {:else}\\n            <ChevronsRight class=\\"w-5 h-5\\" />\\n          {/if}\\n        </button>\\n        <button on:click={openCreateModal} class=\\"p-2 rounded-md text-slate-400 hover:text-white transition\\" title=\\"Créer un tag\\"><Plus class=\\"w-5 h-5\\" /></button>\\n      </div>\\n  </div>\\n\\n  <!-- Expanded popout (overlay on hover) -->\\n  <div class=\\"rail-popout\\" bind:this={railPopoutEl} inert={!railHovered}>\\n    <div class=\\"flex items-center gap-3 mb-4\\">\\n      <div class=\\"flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400\\">\\n        <Folder class=\\"w-4 h-4 text-slate-300\\" />\\n        <span>Espaces & Tags</span>\\n      </div>\\n      <div class=\\"ml-auto\\">\\n        <button on:click={openCreateModal} class=\\"p-1.5 rounded-md text-slate-300 hover:text-white transition\\"> <Plus class=\\"w-4 h-4\\" /> </button>\\n      </div>\\n    </div>\\n\\n    <nav class=\\"space-y-1 overflow-y-auto max-h-[70vh]\\">\\n      {#each folders as f, i (f.id)}\\n        {@const IconComponent = getFolderIcon(f.id)}\\n        {@const isSelected = selected === f.id}\\n        <div\\n          role=\\"group\\"\\n          transition:fly={{ y: 8, duration: 200, delay: i * 20 }}\\n          class=\\"relative group rounded-md\\"\\n          on:dragover|preventDefault={(e) => { e.dataTransfer.dropEffect = 'move'; dragOverId = f.id; }}\\n          on:dragleave={() => dragOverId = null}\\n          on:drop={(e) => { e.preventDefault(); dragOverId = null; const noteId = e.dataTransfer.getData('text/plain'); dispatch('drop', { noteId, folderId: f.id }); }}\\n        >\\n          <button on:click={() => select(f.id)} class=\\"w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-all duration-200 {isSelected ? 'bg-white/[0.02] text-white font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'}\\">\\n            <div class=\\"flex items-center gap-3 min-w-0\\">\\n              <svelte:component this={IconComponent} class=\\"w-5 h-5 flex-shrink-0 {isSelected ? 'text-slate-100' : 'text-slate-500 group-hover:text-slate-300'}\\" />\\n              <span class=\\"text-sm truncate font-medium\\">{f.name}</span>\\n            </div>\\n            <div class=\\"flex items-center gap-2\\">\\n              <span class=\\"px-2 py-0.5 rounded-full text-xs font-semibold {isSelected ? 'bg-white/[0.06] text-white' : 'bg-white/[0.04] text-slate-400'}\\">{f.count}</span>\\n              {#if f.id !== 'all' && f.id !== 'uncat'}\\n                <div class=\\"opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity\\">\\n                  <button on:click|stopPropagation={() => openRenameModal(f.id, f.name)} class=\\"p-1 text-slate-400 hover:text-white rounded-md transition\\" title=\\"Renommer\\"><Pencil class=\\"w-3 h-3\\" /></button>\\n                  <button on:click={(e) => remove(f.id, e)} class=\\"p-1 text-slate-400 hover:text-rose-400 rounded-md transition\\" title=\\"Supprimer\\"><Trash2 class=\\"w-3 h-3\\" /></button>\\n                </div>\\n              {/if}\\n            </div>\\n          </button>\\n        </div>\\n      {/each}\\n    </nav>\\n  </div>\\n\\n  <!-- Create/Rename Tag Modal -->\\n  {#if isModalOpen}\\n    <div transition:fade={{ duration: 150 }} class=\\"fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4\\">\\n      <div transition:scale={{ duration: 180, start: 0.95 }} class=\\"w-full max-w-sm glass-panel p-6 rounded-lg border border-white/10 space-y-4\\">\\n        <div class=\\"flex items-center justify-between\\">\\n          <h3 class=\\"text-base font-bold text-white flex items-center gap-2\\">\\n            <Tag class=\\"w-4 h-4 text-slate-300\\" />\\n            <span>{modalMode === 'create' ? 'Nouveau tag' : 'Renommer le tag'}</span>\\n          </h3>\\n          <button on:click={() => isModalOpen = false} class=\\"text-slate-400 hover:text-white p-1 rounded-md\\"><X class=\\"w-4 h-4\\" /></button>\\n        </div>\\n\\n        <form on:submit|preventDefault={handleModalSubmit} class=\\"space-y-4\\">\\n          <input bind:value={folderNameInput} type=\\"text\\" required placeholder=\\"Nom du tag\\" class=\\"w-full px-4 py-3 rounded-md glass-input text-slate-100 placeholder-slate-500 text-sm outline-none transition\\" on:introend={(e) => e.target.focus()} />\\n\\n          <div class=\\"flex items-center justify-end gap-2 pt-2\\">\\n            <button type=\\"button\\" on:click={() => isModalOpen = false} class=\\"px-4 py-2 rounded-md text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.03] transition\\">Annuler</button>\\n            <button type=\\"submit\\" class=\\"px-5 py-2.5 rounded-md bg-accent btn-primary font-semibold text-xs transition flex items-center gap-1.5\\"><Check class=\\"w-3.5 h-3.5\\" /> <span>{modalMode === 'create' ? 'Créer' : 'Enregistrer'}</span></button>\\n          </div>\\n        </form>\\n      </div>\\n    </div>\\n  {/if}\\n\\n  <ConfirmDialog open={isDeleteConfirmOpen} title=\\"Supprimer ce tag\\" message=\\"Ce tag sera retiré de toutes les notes. Confirmez-vous la suppression ?\\" confirmLabel=\\"Supprimer\\" cancelLabel=\\"Annuler\\" variant=\\"error\\" on:confirm={handleDeleteConfirm} on:cancel={handleDeleteCancel} />\\n</aside>\\n\\n<style>\\n  .app-sidebar { width: 64px; flex: 0 0 64px; position: relative; }\\n  .rail-collapsed { position: relative; width: 64px; height: 100%; }\\n  .rail-popout { position: absolute; left: 0; top: 0; width: 240px; height: 100%; padding: 12px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; box-shadow: 0 6px 24px rgba(0,0,0,0.45); opacity: 0; pointer-events: none; transform: translateX(-64px); transition: opacity 220ms cubic-bezier(0.4,0,0.2,1), transform 220ms cubic-bezier(0.4,0,0.2,1); z-index: 40; }\\n  .app-sidebar:hover .rail-popout { opacity: 1; pointer-events: auto; transform: translateX(0); }\\n  .app-sidebar:hover .rail-popout[inert] { pointer-events: auto; }\\n  .app-sidebar:hover .rail-icons { opacity: 0; pointer-events: none; }\\n  .rail-icons { transition: opacity 220ms ease; }\\n  .badge-collapsed { position: absolute; right: 8px; top: 6px; background: rgba(255,255,255,0.04); color: var(--text); font-size: 10px; padding: 2px 6px; border-radius: 999px; }\\n  .toggle-notes-panel { position: relative; z-index: 50; }\\n  /* ensure popout scrolls independently */\\n  .rail-popout nav { max-height: calc(100vh - 140px); overflow-y: auto; }\\n</style>\\n"],"names":[],"mappings":"AA6JE,wCAAa,CAAE,KAAK,CAAE,IAAI,CAAE,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAE,QAAQ,CAAE,QAAU,CAChE,2CAAgB,CAAE,QAAQ,CAAE,QAAQ,CAAE,KAAK,CAAE,IAAI,CAAE,MAAM,CAAE,IAAM,CACjE,wCAAa,CAAE,QAAQ,CAAE,QAAQ,CAAE,IAAI,CAAE,CAAC,CAAE,GAAG,CAAE,CAAC,CAAE,KAAK,CAAE,KAAK,CAAE,MAAM,CAAE,IAAI,CAAE,OAAO,CAAE,IAAI,CAAE,UAAU,CAAE,IAAI,SAAS,CAAC,CAAE,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,QAAQ,CAAC,CAAE,aAAa,CAAE,IAAI,CAAE,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAE,OAAO,CAAE,CAAC,CAAE,cAAc,CAAE,IAAI,CAAE,SAAS,CAAE,WAAW,KAAK,CAAC,CAAE,UAAU,CAAE,OAAO,CAAC,KAAK,CAAC,aAAa,GAAG,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,SAAS,CAAC,KAAK,CAAC,aAAa,GAAG,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAE,OAAO,CAAE,EAAI,CACvY,0BAAY,MAAM,CAAC,0BAAa,CAAE,OAAO,CAAE,CAAC,CAAE,cAAc,CAAE,IAAI,CAAE,SAAS,CAAE,WAAW,CAAC,CAAG,CAC9F,0BAAY,MAAM,CAAC,YAAY,CAAC,KAAK,eAAE,CAAE,cAAc,CAAE,IAAM,CAC/D,0BAAY,MAAM,CAAC,yBAAY,CAAE,OAAO,CAAE,CAAC,CAAE,cAAc,CAAE,IAAM,CACnE,uCAAY,CAAE,UAAU,CAAE,OAAO,CAAC,KAAK,CAAC,IAAM,CAC9C,4CAAiB,CAAE,QAAQ,CAAE,QAAQ,CAAE,KAAK,CAAE,GAAG,CAAE,GAAG,CAAE,GAAG,CAAE,UAAU,CAAE,KAAK,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,CAAE,KAAK,CAAE,IAAI,MAAM,CAAC,CAAE,SAAS,CAAE,IAAI,CAAE,OAAO,CAAE,GAAG,CAAC,GAAG,CAAE,aAAa,CAAE,KAAO,CAC9K,+CAAoB,CAAE,QAAQ,CAAE,QAAQ,CAAE,OAAO,CAAE,EAAI,CAEvD,0BAAY,CAAC,iBAAI,CAAE,UAAU,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,KAAK,CAAC,CAAE,UAAU,CAAE,IAAM"}`
};
const FolderList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { folders = [] } = $$props;
  let { selected = "all" } = $$props;
  let { notesPanelOpen = true } = $$props;
  let railPopoutEl;
  let isDeleteConfirmOpen = false;
  function getFolderIcon(id) {
    if (id === "all") return Layers;
    if (id === "uncat") return Inbox;
    return Tag;
  }
  if ($$props.folders === void 0 && $$bindings.folders && folders !== void 0) $$bindings.folders(folders);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0) $$bindings.selected(selected);
  if ($$props.notesPanelOpen === void 0 && $$bindings.notesPanelOpen && notesPanelOpen !== void 0) $$bindings.notesPanelOpen(notesPanelOpen);
  $$result.css.add(css);
  return `<aside class="app-sidebar flex-shrink-0 relative svelte-8tjmtw"> <div class="rail-collapsed flex flex-col items-center py-3 gap-3 svelte-8tjmtw"><div class="w-10 h-10 flex items-center justify-center rounded-md">${validate_component(Folder, "Folder").$$render($$result, { class: "w-5 h-5 text-slate-300" }, {}, {})}</div> <div class="rail-icons flex flex-col items-center w-full space-y-1 overflow-hidden svelte-8tjmtw">${each(folders, (f) => {
    let IconComponent = getFolderIcon(f.id);
    return ` <div class="relative w-full flex items-center justify-center p-1"><button class="p-2 rounded-md text-slate-400 hover:text-white transition"${add_attribute("title", f.name, 0)}>${validate_component(IconComponent || missing_component, "svelte:component").$$render($$result, { class: "w-5 h-5" }, {}, {})}</button> <span class="badge-collapsed svelte-8tjmtw">${escape(f.count)}</span> </div>`;
  })}</div> <div class="rail-actions mt-auto pb-2 flex flex-col items-center gap-2"><button class="${"toggle-notes-panel p-2 rounded-md transition text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 " + escape(
    notesPanelOpen ? "bg-white/5 text-white" : "bg-transparent",
    true
  ) + " svelte-8tjmtw"}"${add_attribute("aria-pressed", notesPanelOpen, 0)}${add_attribute(
    "aria-label",
    notesPanelOpen ? "Masquer le panneau notes" : "Afficher le panneau notes",
    0
  )}${add_attribute(
    "title",
    notesPanelOpen ? "Masquer le panneau notes (Ctrl+,)" : "Afficher le panneau notes (Ctrl+,)",
    0
  )}>${notesPanelOpen ? `${validate_component(Chevrons_left, "ChevronsLeft").$$render($$result, { class: "w-5 h-5" }, {}, {})}` : `${validate_component(Chevrons_right, "ChevronsRight").$$render($$result, { class: "w-5 h-5" }, {}, {})}`}</button> <button class="p-2 rounded-md text-slate-400 hover:text-white transition" title="Créer un tag">${validate_component(Plus, "Plus").$$render($$result, { class: "w-5 h-5" }, {}, {})}</button></div></div>  <div class="rail-popout svelte-8tjmtw" ${"inert"}${add_attribute("this", railPopoutEl, 0)}><div class="flex items-center gap-3 mb-4"><div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">${validate_component(Folder, "Folder").$$render($$result, { class: "w-4 h-4 text-slate-300" }, {}, {})} <span data-svelte-h="svelte-4zpckp">Espaces &amp; Tags</span></div> <div class="ml-auto"><button class="p-1.5 rounded-md text-slate-300 hover:text-white transition">${validate_component(Plus, "Plus").$$render($$result, { class: "w-4 h-4" }, {}, {})}</button></div></div> <nav class="space-y-1 overflow-y-auto max-h-[70vh] svelte-8tjmtw">${each(folders, (f, i) => {
    let IconComponent = getFolderIcon(f.id), isSelected = selected === f.id;
    return `  <div role="group" class="relative group rounded-md"><button class="${"w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-all duration-200 " + escape(
      isSelected ? "bg-white/[0.02] text-white font-semibold" : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]",
      true
    )}"><div class="flex items-center gap-3 min-w-0">${validate_component(IconComponent || missing_component, "svelte:component").$$render(
      $$result,
      {
        class: "w-5 h-5 flex-shrink-0 " + (isSelected ? "text-slate-100" : "text-slate-500 group-hover:text-slate-300")
      },
      {},
      {}
    )} <span class="text-sm truncate font-medium">${escape(f.name)}</span></div> <div class="flex items-center gap-2"><span class="${"px-2 py-0.5 rounded-full text-xs font-semibold " + escape(
      isSelected ? "bg-white/[0.06] text-white" : "bg-white/[0.04] text-slate-400",
      true
    )}">${escape(f.count)}</span> ${f.id !== "all" && f.id !== "uncat" ? `<div class="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity"><button class="p-1 text-slate-400 hover:text-white rounded-md transition" title="Renommer">${validate_component(Pencil, "Pencil").$$render($$result, { class: "w-3 h-3" }, {}, {})}</button> <button class="p-1 text-slate-400 hover:text-rose-400 rounded-md transition" title="Supprimer">${validate_component(Trash_2, "Trash2").$$render($$result, { class: "w-3 h-3" }, {}, {})}</button> </div>` : ``} </div></button> </div>`;
  })}</nav></div>  ${``} ${validate_component(ConfirmDialog, "ConfirmDialog").$$render(
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
  )} </aside>`;
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
  return `<div role="button" tabindex="0" class="${"group relative w-full p-3 rounded-md cursor-pointer text-left transition-all duration-200 glass-card " + escape(
    isSelected ? "border border-accent ring-1 ring-accent" : "",
    true
  )}" draggable="true">${isSelected ? `<div class="absolute left-0 top-3 bottom-3 w-1 bg-[var(--accent)] rounded-r-full"></div>` : ``} <div class="flex items-start justify-between gap-3 mb-1"><div class="flex items-center gap-2 min-w-0">${validate_component(File_text, "FileText").$$render(
    $$result,
    {
      class: "w-4 h-4 flex-shrink-0 " + (isSelected ? "text-accent" : "icon-muted group-hover:text-slate-200")
    },
    {},
    {}
  )} <h4 class="text-sm font-serif font-semibold truncate text-slate-100 group-hover:text-white">${escape(note.titlePreview || "Sans titre")}</h4></div> <div class="flex items-center gap-1 text-[11px] text-slate-400 flex-shrink-0">${validate_component(Clock, "Clock").$$render($$result, { class: "w-3 h-3 text-slate-500" }, {}, {})} <span>${escape(formatDate(note.updated_at))}</span></div></div> <p class="text-[13px] text-slate-400 group-hover:text-slate-300 line-clamp-2 leading-tight mb-2">${escape(note.preview || "Note vide…")}</p> <div class="flex items-center justify-between text-[11px] pt-1 border-t border-white/[0.04]"><div class="flex items-center gap-1.5 flex-wrap min-w-0">${note.tags && note.tags.length > 0 ? `${each(note.tags.slice(0, 2), (tag) => {
    return `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/[0.03] text-slate-300 border border-white/[0.06]">${validate_component(Tag, "Tag").$$render($$result, { class: "w-2.5 h-2.5" }, {}, {})} <span>${escape(tag)}</span> </span>`;
  })}` : `<span class="text-[11px] text-slate-600 italic" data-svelte-h="svelte-1981i8m">Sans tag</span>`}</div> <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><button type="button" class="p-1 text-slate-400 hover:text-accent hover:bg-white/10 rounded-lg transition" title="Exporter en TXT">${validate_component(File_down, "FileDown").$$render($$result, { class: "w-3.5 h-3.5" }, {}, {})}</button> <button type="button" class="p-1 text-slate-400 hover:text-rose-400 hover:bg-white/10 rounded-lg transition" title="Supprimer la note">${validate_component(Trash_2, "Trash2").$$render($$result, { class: "w-3.5 h-3.5" }, {}, {})}</button></div></div> ${validate_component(ConfirmDialog, "ConfirmDialog").$$render(
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
const CreateNoteButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["label", "className", "icon"]);
  let { label = "Nouvelle note" } = $$props;
  let { className = "" } = $$props;
  let { icon = Plus } = $$props;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  return `<button${spread(
    [
      { type: "button" },
      {
        class: escape_attribute_value(`rounded-md btn-primary px-4 py-2.5 text-xs font-semibold text-white transition flex items-center gap-2 ${className}`)
      },
      escape_object($$restProps)
    ],
    {}
  )}>${validate_component(icon || missing_component, "svelte:component").$$render($$result, { class: "w-4 h-4" }, {}, {})} <span>${escape(label)}</span></button>`;
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
  let notesPanelOpen = true;
  filteredNotesList = (() => {
    let list = notes.slice().sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    return list;
  })();
  $$unsubscribe_btnScale();
  return `${$$result.head += `<!-- HEAD_svelte-1snf3hs_START -->${$$result.title = `<title>Private Notes · Workspace Chiffré</title>`, ""}<!-- HEAD_svelte-1snf3hs_END -->`, ""} <div class="relative flex flex-col h-screen overflow-hidden p-4 md:p-6 gap-4 page-shell"><div class="pointer-events-none absolute inset-0 page-bg-surface"></div>  <header class="flex items-center justify-between px-6 py-3.5 glass-panel rounded-lg border border-white/10 shadow-2xl flex-shrink-0"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-md bg-transparent border border-white/6 flex items-center justify-center text-slate-300 font-bold">${validate_component(Shield_check, "ShieldCheck").$$render($$result, { class: "w-6 h-6 icon-muted" }, {}, {})}</div> <div data-svelte-h="svelte-jajc4p"><h1 class="text-base font-bold text-white tracking-tight leading-tight flex items-center gap-2">Private Notes
          <span class="px-2 py-0.5 rounded-full bg-white/[0.03] text-slate-300 text-[10px] font-semibold tracking-wider border border-white/[0.06]">v2.0 AES-256</span></h1> <p class="text-xs text-slate-400">Espace de travail chiffré de bout en bout</p></div></div>  <div class="flex items-center gap-3"><div class="relative w-64 md:w-80">${validate_component(Search, "Search").$$render(
    $$result,
    {
      class: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
    },
    {},
    {}
  )} <input placeholder="Rechercher des notes (⌘K)…" class="w-full pl-10 pr-9 py-2.5 rounded-md glass-input text-slate-100 placeholder-slate-500 text-xs outline-none transition"${add_attribute("this", searchInputEl, 0)}${add_attribute("value", search, 0)}> ${``}</div> ${validate_component(CreateNoteButton, "CreateNoteButton").$$render(
    $$result,
    {
      style: "transform: scale(" + $btnScale + ");"
    },
    {},
    {}
  )} <button class="p-2.5 rounded-md glass-input text-slate-400 hover:text-amber-400 hover:border-amber-400/40 transition" title="Verrouiller le coffre-fort">${validate_component(Lock, "Lock").$$render($$result, { class: "w-4 h-4" }, {}, {})}</button></div></header>  <div class="flex-1 min-h-0 flex gap-4 overflow-hidden"> ${validate_component(FolderList, "FolderList").$$render(
    $$result,
    {
      folders,
      selected: selectedFolder,
      notesPanelOpen
    },
    {},
    {}
  )}  <aside${add_attribute("class", `hidden md:block flex-shrink-0 overflow-hidden transition-all duration-300 ${"w-72"}`, 0)}><section${add_attribute(
    "class",
    `glass-panel rounded-lg p-3 border border-white/10 shadow-2xl h-full flex flex-col overflow-hidden transition-all duration-300 ${"opacity-100"}`,
    0
  )}><div class="flex items-center justify-between px-2 mb-3"><span class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">${validate_component(File_text, "FileText").$$render($$result, { class: "w-3.5 h-3.5 text-slate-400" }, {}, {})} <span>Notes (${escape(filteredNotesList.length)})</span></span> <button class="p-1.5 rounded-md text-slate-400 hover:text-white transition"${add_attribute(
    "title",
    "Masquer le panneau notes (Ctrl+,)",
    0
  )}>${`${validate_component(Chevrons_left, "ChevronsLeft").$$render($$result, { class: "w-4 h-4" }, {}, {})}`}</button></div> <div class="flex-1 overflow-y-auto pr-1 space-y-2.5 h-[calc(100%-44px)]">${filteredNotesList.length > 0 ? `${each(filteredNotesList, (note, i) => {
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
  })}` : `<div class="h-full flex flex-col items-center justify-center text-center p-4 text-slate-500 space-y-3 empty-state-card"><div class="empty-illustration">${validate_component(Folder_open, "FolderOpen").$$render(
    $$result,
    {
      class: "w-10 h-10 stroke-1 text-slate-500 icon-muted"
    },
    {},
    {}
  )}</div> <div class="space-y-1" data-svelte-h="svelte-lwhfxf"><p class="text-sm font-semibold text-slate-400">Aucune note trouvée</p> <p class="text-xs text-slate-500">Créez votre première note chiffrée pour commencer.</p></div> ${validate_component(CreateNoteButton, "CreateNoteButton").$$render(
    $$result,
    {
      className: "px-3 py-2 text-xs font-semibold"
    },
    {},
    {}
  )}</div>`}</div></section></aside>  <main class="flex-1 min-w-0 h-full overflow-auto"><div class="flex justify-center w-full h-full"><div class="w-full max-w-[900px] h-full">${`<div class="h-full glass-panel rounded-lg p-8 border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center space-y-4 empty-state-card"><div class="empty-illustration">${validate_component(Sparkles, "Sparkles").$$render(
    $$result,
    {
      class: "w-8 h-8 text-slate-200 icon-muted"
    },
    {},
    {}
  )}</div> <div class="max-w-sm space-y-2" data-svelte-h="svelte-1r2nt1i"><h3 class="text-xl font-bold text-white">Aucune note sélectionnée</h3> <p class="text-xs text-slate-400 leading-relaxed">Sélectionnez une note dans la liste pour l&#39;éditer, ou créez un nouveau document chiffré en un clic.</p></div> ${validate_component(CreateNoteButton, "CreateNoteButton").$$render($$result, { className: "px-6 py-3 text-xs font-bold" }, {}, {})}</div>`}</div></div></main></div></div>`;
});
export {
  Page as default
};
