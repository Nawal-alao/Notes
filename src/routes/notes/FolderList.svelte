<script>
  import { createEventDispatcher } from 'svelte';
  import { fly, fade, scale } from 'svelte/transition';
  import { Folder, FolderOpen, Tag, Pencil, Trash2, Layers, Inbox, Plus, X, Check } from 'lucide-svelte';
  import ConfirmDialog from '$lib/ConfirmDialog.svelte';

  const dispatch = createEventDispatcher();

  export let folders = [];
  export let selected = 'all';
  export let notesPanelOpen = true;
  let dragOverId = null;
  let railHovered = false;

  // Modal State for Create / Rename
  let isModalOpen = false;
  let modalMode = 'create'; // 'create' | 'rename'
  let targetFolderId = null;
  let folderNameInput = '';
  let isDeleteConfirmOpen = false;
  let deleteTargetId = null;

  function select(id) { dispatch('select', id); }
  function toggleNotesPanel() { dispatch('toggle-notes-panel'); }
  function openCreateModal() { modalMode = 'create'; folderNameInput = ''; targetFolderId = null; isModalOpen = true; }
  function openRenameModal(id, currentName) { modalMode = 'rename'; folderNameInput = currentName; targetFolderId = id; isModalOpen = true; }

  function handleModalSubmit() {
    if (!folderNameInput.trim()) return;
    if (modalMode === 'create') dispatch('create', folderNameInput.trim());
    else if (modalMode === 'rename' && targetFolderId) dispatch('rename', { id: targetFolderId, name: folderNameInput.trim() });
    isModalOpen = false;
  }

  function remove(id, e) { e.stopPropagation(); deleteTargetId = id; isDeleteConfirmOpen = true; }
  function handleDeleteConfirm() { if (deleteTargetId) dispatch('delete', deleteTargetId); deleteTargetId = null; isDeleteConfirmOpen = false; }
  function handleDeleteCancel() { deleteTargetId = null; isDeleteConfirmOpen = false; }

  function getFolderIcon(id) { if (id === 'all') return Layers; if (id === 'uncat') return Inbox; return Tag; }

</script>

<aside class="app-sidebar flex-shrink-0 relative" on:mouseenter={() => railHovered = true} on:mouseleave={() => railHovered = false}>
  <!-- Collapsed rail (icons only) -- visible by default -->
  <div class="rail-collapsed flex flex-col items-center py-3 gap-3">
    <div class="w-10 h-10 flex items-center justify-center rounded-md">
      <Folder class="w-5 h-5 text-slate-300" />
    </div>
    <div class="flex flex-col items-center w-full space-y-1 overflow-hidden">
      {#each folders as f (f.id)}
        {@const IconComponent = getFolderIcon(f.id)}
        <div class="relative w-full flex items-center justify-center p-1">
          <button on:click={() => select(f.id)} class="p-2 rounded-md text-slate-400 hover:text-white transition" title={f.name}>
            <svelte:component this={IconComponent} class="w-5 h-5" />
          </button>
          <span class="badge-collapsed">{f.count}</span>
        </div>
      {/each}
    </div>
    <div class="mt-auto pb-2 flex flex-col items-center gap-2">
      <button on:click={toggleNotesPanel} class="p-2 rounded-md text-slate-400 hover:text-white transition" title={notesPanelOpen ? 'Masquer le panneau notes (Ctrl+,)' : 'Afficher le panneau notes (Ctrl+,)'}>
        {#if notesPanelOpen}
          <FolderOpen class="w-5 h-5" />
        {:else}
          <Folder class="w-5 h-5" />
        {/if}
      </button>
      <button on:click={openCreateModal} class="p-2 rounded-md text-slate-400 hover:text-white transition" title="Créer un tag"><Plus class="w-5 h-5" /></button>
    </div>
  </div>

  <!-- Expanded popout (overlay on hover) -->
  <div class="rail-popout" aria-hidden={!railHovered} inert={!railHovered}>
    <div class="flex items-center gap-3 mb-4">
      <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
        <Folder class="w-4 h-4 text-slate-300" />
        <span>Espaces & Tags</span>
      </div>
      <div class="ml-auto">
        <button on:click={openCreateModal} class="p-1.5 rounded-md text-slate-300 hover:text-white transition"> <Plus class="w-4 h-4" /> </button>
      </div>
    </div>

    <nav class="space-y-1 overflow-y-auto max-h-[70vh]">
      {#each folders as f, i (f.id)}
        {@const IconComponent = getFolderIcon(f.id)}
        {@const isSelected = selected === f.id}
        <div
          role="group"
          transition:fly={{ y: 8, duration: 200, delay: i * 20 }}
          class="relative group rounded-md"
          on:dragover|preventDefault={(e) => { e.dataTransfer.dropEffect = 'move'; dragOverId = f.id; }}
          on:dragleave={() => dragOverId = null}
          on:drop={(e) => { e.preventDefault(); dragOverId = null; const noteId = e.dataTransfer.getData('text/plain'); dispatch('drop', { noteId, folderId: f.id }); }}
        >
          <button on:click={() => select(f.id)} class="w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-all duration-200 {isSelected ? 'bg-white/[0.02] text-white font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'}">
            <div class="flex items-center gap-3 min-w-0">
              <svelte:component this={IconComponent} class="w-5 h-5 flex-shrink-0 {isSelected ? 'text-slate-100' : 'text-slate-500 group-hover:text-slate-300'}" />
              <span class="text-sm truncate font-medium">{f.name}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-full text-xs font-semibold {isSelected ? 'bg-white/[0.06] text-white' : 'bg-white/[0.04] text-slate-400'}">{f.count}</span>
              {#if f.id !== 'all' && f.id !== 'uncat'}
                <div class="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                  <button on:click|stopPropagation={() => openRenameModal(f.id, f.name)} class="p-1 text-slate-400 hover:text-white rounded-md transition" title="Renommer"><Pencil class="w-3 h-3" /></button>
                  <button on:click={(e) => remove(f.id, e)} class="p-1 text-slate-400 hover:text-rose-400 rounded-md transition" title="Supprimer"><Trash2 class="w-3 h-3" /></button>
                </div>
              {/if}
            </div>
          </button>
        </div>
      {/each}
    </nav>
  </div>

  <!-- Create/Rename Tag Modal -->
  {#if isModalOpen}
    <div transition:fade={{ duration: 150 }} class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div transition:scale={{ duration: 180, start: 0.95 }} class="w-full max-w-sm glass-panel p-6 rounded-lg border border-white/10 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold text-white flex items-center gap-2">
            <Tag class="w-4 h-4 text-slate-300" />
            <span>{modalMode === 'create' ? 'Nouveau tag' : 'Renommer le tag'}</span>
          </h3>
          <button on:click={() => isModalOpen = false} class="text-slate-400 hover:text-white p-1 rounded-md"><X class="w-4 h-4" /></button>
        </div>

        <form on:submit|preventDefault={handleModalSubmit} class="space-y-4">
          <input bind:value={folderNameInput} type="text" required placeholder="Nom du tag" class="w-full px-4 py-3 rounded-md glass-input text-slate-100 placeholder-slate-500 text-sm outline-none transition" on:introend={(e) => e.target.focus()} />

          <div class="flex items-center justify-end gap-2 pt-2">
            <button type="button" on:click={() => isModalOpen = false} class="px-4 py-2 rounded-md text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.03] transition">Annuler</button>
            <button type="submit" class="px-5 py-2.5 rounded-md bg-accent btn-primary font-semibold text-xs transition flex items-center gap-1.5"><Check class="w-3.5 h-3.5" /> <span>{modalMode === 'create' ? 'Créer' : 'Enregistrer'}</span></button>
          </div>
        </form>
      </div>
    </div>
  {/if}

  <ConfirmDialog open={isDeleteConfirmOpen} title="Supprimer ce tag" message="Ce tag sera retiré de toutes les notes. Confirmez-vous la suppression ?" confirmLabel="Supprimer" cancelLabel="Annuler" variant="error" on:confirm={handleDeleteConfirm} on:cancel={handleDeleteCancel} />
</aside>

<style>
  .app-sidebar { width: 64px; flex: 0 0 64px; position: relative; }
  .rail-collapsed { width: 64px; height: 100%; }
  .rail-popout { position: absolute; left: 0; top: 0; width: 240px; height: 100%; padding: 12px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; box-shadow: 0 6px 24px rgba(0,0,0,0.45); opacity: 0; pointer-events: none; transform: translateX(-8px); transition: opacity 220ms cubic-bezier(0.4,0,0.2,1), transform 220ms cubic-bezier(0.4,0,0.2,1); z-index: 30; }
  .app-sidebar:hover .rail-popout { opacity: 1; pointer-events: auto; transform: translateX(0); }
  .app-sidebar:hover .rail-popout[inert] { pointer-events: auto; }
  .badge-collapsed { position: absolute; right: 8px; top: 6px; background: rgba(255,255,255,0.04); color: var(--text); font-size: 10px; padding: 2px 6px; border-radius: 999px; }
  /* ensure popout scrolls independently */
  .rail-popout nav { max-height: calc(100vh - 140px); overflow-y: auto; }
</style>
