<svelte:options
  customElement={{
    tag: "upload-manager",
    shadow: "none"
  }}
/>

<script>
  import { onMount } from "svelte"
  import { formatBytes } from "../core/uploader-core.js"

  let { core } = $props()

  let state = $state({
    localFiles: [],
    remoteFiles: [],
    counts: { local: 0, remote: 0 },
    progress: 0
  })

  let fileInput
  let dropzoneOver = $state(false)
  let savingCaptions = $state({})

  onMount(() => {
    if (!core) return
    state = core.getState()

    const unsubscribe = core.subscribe((nextState) => {
      state = nextState
    })

    return () => {
      unsubscribe?.()
    }
  })

  function onBrowseFiles(event) {
    const files = [...(event.currentTarget.files || [])]
    if (files.length > 0) {
      core.addFiles(files)
    }
    event.currentTarget.value = ""
  }

  async function onStart() {
    await core.startUpload()
  }

  function onCancel() {
    core.cancelAll()
  }

  async function onClearCompleted() {
    await core.clearCompleted()
  }

  function onDrop(event) {
    event.preventDefault()
    dropzoneOver = false
    const files = [...(event.dataTransfer?.files || [])]
    if (files.length > 0) {
      core.addFiles(files)
    }
  }

  async function onCaptionChange(id, value) {
    const previous = savingCaptions
    savingCaptions = { ...savingCaptions, [id]: true }
    try {
      await core.saveRemoteCaption(id, value)
    } finally {
      savingCaptions = { ...previous, [id]: false }
    }
  }

  async function onRemoveRemote(id) {
    try {
      await core.removeRemoteById(id)
    } catch {
      // Callback d'erreur deja emise par le core
    }
  }

  async function onRemoveLocal(id) {
    try {
      await core.removeLocalById(id)
    } catch {
      // Callback d'erreur deja emise par le core
    }
  }
</script>

<main class="uploader">
  <header class="toolbar">
    <button type="button" class="btn btn-primary" onclick={() => fileInput.click()}>{core.labels.addFiles}</button>
    <button type="button" class="btn btn-success" onclick={onStart}>{core.labels.startUpload}</button>
    <button type="button" class="btn btn-warning" onclick={onCancel}>{core.labels.cancel}</button>
    <button type="button" class="btn btn-danger" onclick={onClearCompleted}>{core.labels.clearCompleted}</button>
    <input bind:this={fileInput} type="file" multiple={core.options.multiple} hidden onchange={onBrowseFiles}>
  </header>

  <section
    class="drop-zone"
    class:is-over={dropzoneOver}
    aria-label="Zone de depot"
    ondragover={(event) => {
      event.preventDefault()
      dropzoneOver = true
    }}
    ondragleave={() => {
      dropzoneOver = false
    }}
    ondrop={onDrop}
  >
    {core.labels.dropzone}
  </section>

  <section class="global-progress-wrap" aria-label="Progression globale">
    <div class="global-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={state.progress}>
      <div class="global-progress-bar" style={`width: ${state.progress}%`}></div>
    </div>
    <span>{state.progress}%</span>
  </section>

  <section class="table-wrap">
    <table class="file-table">
      <thead>
        <tr>
          <th>Apercu</th>
          <th>Fichier</th>
          <th>Taille</th>
          <th>Legende</th>
          <th>Statut</th>
          <th>Progression</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#if state.localFiles.length === 0 && state.remoteFiles.length === 0}
          <tr>
            <td colspan="7" class="empty">{core.labels.empty}</td>
          </tr>
        {/if}

        {#each state.remoteFiles as file, index (String(file.id))}
          {@const isImage = typeof file.type === "string" && file.type.startsWith("image/")}
          <tr>
            <td>
              {#if isImage && file.url}
                <img class="thumb" src={file.url} alt={`Apercu de ${file.name || "fichier"}`}>
              {:else}
                <div class="thumb thumb-placeholder">FILE</div>
              {/if}
            </td>
            <td>
              <div class="name">{file.name || "fichier"}</div>
              <div class="meta">{file.type || "type inconnu"}</div>
            </td>
            <td>{formatBytes(Number(file.size || 0))}</td>
            <td>
              <input
                type="text"
                class="caption-input"
                class:is-saving={savingCaptions[String(file.id)]}
                value={String(file.caption || "")}
                placeholder={core.labels.captionPlaceholder}
                disabled={Boolean(savingCaptions[String(file.id)])}
                onchange={(event) => onCaptionChange(String(file.id), event.currentTarget.value)}
                onkeydown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    event.currentTarget.blur()
                  }
                  if (event.key === "Escape") {
                    event.preventDefault()
                    event.currentTarget.value = String(file.caption || "")
                    event.currentTarget.blur()
                  }
                }}
              >
            </td>
            <td>{core.labels.serverState}</td>
            <td><span class="row-progress-label">100%</span></td>
            <td>
              <button type="button" class="btn btn-mini btn-primary" disabled={index === 0} onclick={() => core.moveRemote(String(file.id), "up")}>↑</button>
              <button type="button" class="btn btn-mini btn-primary" disabled={index === state.remoteFiles.length - 1} onclick={() => core.moveRemote(String(file.id), "down")}>↓</button>
              <button type="button" class="btn btn-mini btn-danger" onclick={() => onRemoveRemote(String(file.id))}>{core.labels.remove}</button>
            </td>
          </tr>
        {/each}

        {#each state.localFiles as file, index (file.id)}
          {@const percent = Math.round(file.progress?.percentage || 0)}
          {@const status = core.computeFileStatus(file)}
          {@const previewUrl = core.getPreviewUrl(file)}

          <tr>
            <td>
              {#if previewUrl}
                <img class="thumb" src={previewUrl} alt={`Apercu de ${file.name}`}>
              {:else}
                <div class="thumb thumb-placeholder">FILE</div>
              {/if}
            </td>
            <td>
              <div class="name">{file.name}</div>
              <div class="meta">{file.type || "type inconnu"}</div>
            </td>
            <td>{formatBytes(file.size)}</td>
            <td><span class="row-progress-label">-</span></td>
            <td>{status}</td>
            <td>
              <div class="row-progress">
                <div class="row-progress-bar" style={`width: ${percent}%`}></div>
              </div>
              <span class="row-progress-label">{percent}%</span>
            </td>
            <td>
              <button type="button" class="btn btn-mini btn-primary" disabled={index === 0} onclick={() => core.moveLocal(file.id, "up")}>↑</button>
              <button type="button" class="btn btn-mini btn-primary" disabled={index === state.localFiles.length - 1} onclick={() => core.moveLocal(file.id, "down")}>↓</button>
              <button type="button" class="btn btn-mini btn-danger" onclick={() => onRemoveLocal(file.id)}>{core.labels.remove}</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
</main>
