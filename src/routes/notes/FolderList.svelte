<script>
  import { createEventDispatcher } from 'svelte';
  import { fly, fade, scale } from 'svelte/transition';
  import { Folder, FolderPlus, FolderOpen, Tag, Pencil, Trash2, Layers, Inbox, Plus, X, Check, ChevronLeft, ChevronRight } from 'lucide-svelte';
  import ConfirmDialog from '$lib/ConfirmDialog.svelte';

  const dispatch = createEventDispatcher();

  export let folders = [];
  export let selected = 'all';
  let dragOverId = null;
  let collapsed = false;

  // Modal State for Create / Rename
  let isModalOpen = false;
  let modalMode = 'create'; // 'create' | 'rename'
  let targetFolderId = null;
  let folderNameInput = '';
  let isDeleteConfirmOpen = false;
  let deleteTargetId = null;

  function select(id) {
    dispatch('select', id);
  }

  function openCreateModal() {
    modalMode = 'create';
    folderNameInput = '';
    targetFolderId = null;
    isModalOpen = true;
  }

  function toggleCollapse() {
    collapsed = !collapsed;
    // emit event for parent if needed
    dispatch('toggle', collapsed);
  }

  function openRenameModal(id, currentName) {
    modalMode = 'rename';
    folderNameInput = currentName;
    targetFolderId = id;
    isModalOpen = true;
  }

  function handleModalSubmit() {
    if (!folderNameInput.trim()) return;
    if (modalMode === 'create') {
      dispatch('create', folderNameInput.trim());
    } else if (modalMode === 'rename' && targetFolderId) {
      dispatch('rename', { id: targetFolderId, name: folderNameInput.trim() });
    }
    isModalOpen = false;
  }

  function remove(id, e) {
    e.stopPropagation();
    deleteTargetId = id;
    isDeleteConfirmOpen = true;
  }

  function handleDeleteConfirm() {
    if (deleteTargetId) {
      dispatch('delete', deleteTargetId);
    }
    deleteTargetId = null;
    isDeleteConfirmOpen = false;
  }

  function handleDeleteCancel() {
    deleteTargetId = null;
    isDeleteConfirmOpen = false;
  }

  function getFolderIcon(id) {
    if (id === 'all') return Layers;
    if (id === 'uncat') return Inbox;
    return Tag;
  }
</script>

<aside class="app-sidebar {collapsed ? 'collapsed' : ''} flex-shrink-0 flex flex-col glass-panel rounded-3xl p-3 border border-white/10 shadow-2xl relative overflow-hidden">
  <!-- Top Title Bar -->
  <div class="flex items-center justify-between px-2 mb-4">
    <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
      <Folder class="w-4 h-4 text-cyan-400" />
      <span class="truncate {collapsed ? 'hidden' : ''}">Espaces & Tags</span>
    </div>
    <div class="flex items-center gap-2">
      <button
        on:click={toggleCollapse}
        class="p-1.5 rounded-xl bg-white/[0.02] border border-white/6 text-slate-300 hover:text-cyan-300 transition-all duration-200"
        title="Réduire la barre latérale"
      >
        {#if collapsed}
          <ChevronRight class="w-4 h-4" />
        {:else}
          <ChevronLeft class="w-4 h-4" />
        {/if}
      </button>

      <button
        on:click={openCreateModal}
        class="p-1.5 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all duration-200 {collapsed ? 'hidden' : ''}"
        title="Créer un nouveau tag"
      >
        <Plus class="w-4 h-4" />
      </button>
    </div>
  </div>

  <!-- Folder List -->
  <nav class="flex-1 space-y-1 overflow-y-auto pr-1">
    {#each folders as f, i (f.id)}
      {@const IconComponent = getFolderIcon(f.id)}
      {@const isSelected = selected === f.id}
      {@const isDragTarget = dragOverId === f.id}

      <div
        role="group"
        transition:fly={{ y: 8, duration: 200, delay: i * 30 }}
        class="relative group rounded-2xl transition-all duration-200 {isDragTarget ? 'ring-2 ring-cyan-400 bg-cyan-500/10 scale-[1.02]' : ''}"
        on:dragover|preventDefault={(e) => { e.dataTransfer.dropEffect = 'move'; dragOverId = f.id; }}
        on:dragleave={() => dragOverId = null}
        on:drop={(e) => {
          e.preventDefault();
          dragOverId = null;
          const noteId = e.dataTransfer.getData('text/plain');
          dispatch('drop', { noteId, folderId: f.id });
        }}
      >
        <button
          on:click={() => select(f.id)}
          class="w-full flex items-center justify-between px-3 py-2 rounded-2xl text-left transition-all duration-200 {isSelected ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/10 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'}"
        >
          <div class="flex items-center gap-3 min-w-0">
            <svelte:component this={IconComponent} class="w-5 h-5 flex-shrink-0 {isSelected ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}" />
            <span class="text-sm truncate font-medium {collapsed ? 'hidden' : ''}">{f.name}</span>
          </div>

          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded-full text-xs font-semibold {isSelected ? 'bg-cyan-500/30 text-cyan-200' : 'bg-white/[0.06] text-slate-400 group-hover:text-slate-300'} {collapsed ? 'hidden' : ''}">
              {f.count}
            </span>

            {#if f.id !== 'all' && f.id !== 'uncat'}
              <div class="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity {collapsed ? 'hidden' : ''}">
                <button
                  on:click|stopPropagation={() => openRenameModal(f.id, f.name)}
                  class="p-1 text-slate-400 hover:text-cyan-300 hover:bg-white/10 rounded-lg transition"
                  title="Renommer"
                >
                  <Pencil class="w-3 h-3" />
                </button>
                <button
                  on:click={(e) => remove(f.id, e)}
                  class="p-1 text-slate-400 hover:text-rose-400 hover:bg-white/10 rounded-lg transition"
                  title="Supprimer"
                >
                  <Trash2 class="w-3 h-3" />
                </button>
              </div>
            {/if}
          </div>
        </button>
      </div>
    {/each}
  </nav>

  <!-- Create/Rename Tag Modal -->
  {#if isModalOpen}
    <div transition:fade={{ duration: 150 }} class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div transition:scale={{ duration: 180, start: 0.95 }} class="w-full max-w-sm glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold text-white flex items-center gap-2">
            <Tag class="w-4 h-4 text-cyan-400" />
            <span>{modalMode === 'create' ? 'Nouveau tag' : 'Renommer le tag'}</span>
          </h3>
          <button on:click={() => isModalOpen = false} class="text-slate-400 hover:text-white p-1 rounded-lg">
            <X class="w-4 h-4" />
          </button>
        </div>

        <form on:submit|preventDefault={handleModalSubmit} class="space-y-4">
          <input
            bind:value={folderNameInput}
            type="text"
            required
            placeholder="Nom du tag (ex: Travail, Projet)..."
            class="w-full px-4 py-3 rounded-2xl glass-input text-slate-100 placeholder-slate-500 text-sm outline-none transition focus:border-cyan-400"
            on:introend={(e) => e.target.focus()}
          />

          <div class="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              on:click={() => isModalOpen = false}
              class="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.05] transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-slate-950 text-xs transition hover:opacity-95 flex items-center gap-1.5"
            >
              <Check class="w-3.5 h-3.5" />
              <span>{modalMode === 'create' ? 'Créer' : 'Enregistrer'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  {/if}

  <ConfirmDialog
    open={isDeleteConfirmOpen}
    title="Supprimer ce tag"
    message="Ce tag sera retiré de toutes les notes. Confirmez-vous la suppression ?"
    confirmLabel="Supprimer"
    cancelLabel="Annuler"
    variant="error"
    on:confirm={handleDeleteConfirm}
    on:cancel={handleDeleteCancel}
  />
</aside>

