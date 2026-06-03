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

{#snippet iconUp()}
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
{/snippet}

{#snippet iconDown()}
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
{/snippet}

{#snippet iconRemove()}
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
{/snippet}

<main class="uploader">
  <header class="toolbar">
    <button type="button" class="btn btn-primary" onclick={() => fileInput.click()}>{core.t("addFiles")}</button>
    <button type="button" class="btn btn-success" onclick={onStart}>{core.t("startUpload")}</button>
    <button type="button" class="btn btn-warning" onclick={onCancel}>{core.t("cancel")}</button>
    <input bind:this={fileInput} type="file" multiple={core.options.multiple} hidden onchange={onBrowseFiles}>
  </header>

  <section
    class="drop-zone"
    class:is-over={dropzoneOver}
    aria-label={core.t("ariaDropzone")}
    ondragover={(event) => {
      event.preventDefault()
      dropzoneOver = true
    }}
    ondragleave={() => {
      dropzoneOver = false
    }}
    ondrop={onDrop}
  >
    {core.t("dropzone")}
  </section>

  <section class="global-progress-wrap" aria-label={core.t("ariaGlobalProgress")}>
    <div class="global-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={state.progress}>
      <div class="global-progress-bar" style={`width: ${state.progress}%`}></div>
    </div>
    <span>{state.progress}%</span>
  </section>

  <section class="table-wrap">
    <table class="file-table">
      <thead>
        <tr>
          <th>{core.t("headerPreview")}</th>
          <th>{core.t("headerFile")}</th>
          <th>{core.t("headerSize")}</th>
          <th>{core.t("headerCaption")}</th>
          <th>{core.t("headerStatus")}</th>
          <th>{core.t("headerProgress")}</th>
          <th>{core.t("headerActions")}</th>
        </tr>
      </thead>
      <tbody>
        {#if state.localFiles.length === 0 && state.remoteFiles.length === 0}
          <tr>
            <td colspan="7" class="empty">{core.t("empty")}</td>
          </tr>
        {/if}

        {#each state.remoteFiles as file, index (String(file.id))}
          {@const isImage = typeof file.type === "string" && file.type.startsWith("image/")}
          <tr>
            <td>
              {#if isImage && file.url}
                <img class="thumb" src={file.url} alt={core.t("previewAlt", { name: file.name || core.t("fallbackFileName") })}>
              {:else}
                <div class="thumb thumb-placeholder">FILE</div>
              {/if}
            </td>
            <td>
              <a class="name" href={file.url} target="_blank" rel="noopener" title={file.name || core.t("fallbackFileName")}>{file.name || core.t("fallbackFileName")}</a>
              <div class="meta">{file.type || core.t("unknownType")}</div>
            </td>
            <td>{formatBytes(Number(file.size || 0))}</td>
            <td>
              <input
                type="text"
                class="caption-input"
                class:is-saving={savingCaptions[String(file.id)]}
                value={String(file.caption || "")}
                placeholder={core.t("captionPlaceholder")}
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
            <td>{core.t("serverState")}</td>
            <td><span class="row-progress-label">100%</span></td>
            <td>
              <button type="button" class="btn btn-mini btn-primary" title={core.t("moveUp")} aria-label={core.t("moveUp")} disabled={index === 0} onclick={() => core.moveRemote(String(file.id), "up")}>{@render iconUp()}</button>
              <button type="button" class="btn btn-mini btn-primary" title={core.t("moveDown")} aria-label={core.t("moveDown")} disabled={index === state.remoteFiles.length - 1} onclick={() => core.moveRemote(String(file.id), "down")}>{@render iconDown()}</button>
              <button type="button" class="btn btn-mini btn-danger" title={core.t("remove")} aria-label={core.t("remove")} onclick={() => onRemoveRemote(String(file.id))}>{@render iconRemove()}</button>
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
                <img class="thumb" src={previewUrl} alt={core.t("previewAlt", { name: file.name })}>
              {:else}
                <div class="thumb thumb-placeholder">FILE</div>
              {/if}
            </td>
            <td>
              <div class="name" title={file.name}>{file.name}</div>
              <div class="meta">{file.type || core.t("unknownType")}</div>
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
              <button type="button" class="btn btn-mini btn-primary" title={core.t("moveUp")} aria-label={core.t("moveUp")} disabled={index === 0} onclick={() => core.moveLocal(file.id, "up")}>{@render iconUp()}</button>
              <button type="button" class="btn btn-mini btn-primary" title={core.t("moveDown")} aria-label={core.t("moveDown")} disabled={index === state.localFiles.length - 1} onclick={() => core.moveLocal(file.id, "down")}>{@render iconDown()}</button>
              <button type="button" class="btn btn-mini btn-danger" title={core.t("remove")} aria-label={core.t("remove")} onclick={() => onRemoveLocal(file.id)}>{@render iconRemove()}</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
</main>
