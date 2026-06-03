import Uppy from '@uppy/core';
import XHR from '@uppy/xhr-upload';
import { locales, DEFAULT_LOCALE } from "../locales/index.js"

// Kept for backward compatibility: the default locale's label set.
// The source of truth is now the locale packs (src/locales/).
export const DEFAULT_LABELS = locales[DEFAULT_LOCALE].strings

export const DEFAULT_OPTIONS = {
  endpoint: "./app.php",
  listEndpoint: "./app.php",
  deleteEndpoint: "./app.php",
  orderEndpoint: "./app.php",
  updateEndpoint: "./app.php",
  fieldName: "file",
  maxFileSize: 5 * 1024 * 1024,
  autoProceed: false,
  multiple: true,
  showRemoteFiles: true,
  persistOrder: true,
  locale: DEFAULT_LOCALE,
  labels: {}
}

// Resolves the `locale` option into a full { strings, pluralize } pack.
// Accepts a known key ("fr", "en"), a custom pack, or a partial pack.
// `labels` (backward compatibility) then override individual strings.
export const resolveLocale = (locale, labels = {}) => {
  const base = locales[DEFAULT_LOCALE]
  const pack = typeof locale === "string" ? (locales[locale] || base) : (locale || base)
  return {
    strings: { ...base.strings, ...pack.strings, ...labels },
    pluralize: pack.pluralize || base.pluralize
  }
}

export const formatBytes = (bytes) => {
  if (!Number.isFinite(bytes) || bytes <= 0) return "-"
  const units = ["o", "Ko", "Mo", "Go", "To"]
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / (1024 ** index)
  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`
}

export class UploaderCore {
  constructor(options = {}) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options
    }
    this.options.updateEndpoint = options.updateEndpoint ?? options.orderEndpoint ?? "./app.php"

    const locale = resolveLocale(this.options.locale, this.options.labels)
    this.strings = locale.strings
    this.pluralize = locale.pluralize
    // Backward-compatible alias: existing code reading `core.labels.x` keeps working.
    this.labels = this.strings
    this.remoteFiles = []
    this.localOrder = []
    this.remoteOrder = []
    this.previewUrls = new Map()

    this.listeners = new Set()
    this.eventListeners = new Map()

    this.uppy = new Uppy({
      autoProceed: this.options.autoProceed,
      allowMultipleUploadBatches: true,
      restrictions: {
        maxNumberOfFiles: this.options.multiple ? null : 1,
        maxFileSize: this.options.maxFileSize
      }
    })

    this.uppy.use(XHR, {
      endpoint: this.options.endpoint,
      method: "post",
      fieldName: this.options.fieldName,
      formData: true
    })

    this.bindUppyEvents()
  }

  async init() {
    if (this.options.showRemoteFiles) {
      await this.loadRemoteFiles()
    }
    this.emit("ready", { state: this.getState() })
    this.notify()
  }

  on(eventName, listener) {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, new Set())
    }
    this.eventListeners.get(eventName).add(listener)
    return () => {
      this.eventListeners.get(eventName)?.delete(listener)
    }
  }

  emit(eventName, payload = {}) {
    const listeners = this.eventListeners.get(eventName)
    if (!listeners) return

    for (const listener of listeners) {
      try {
        listener(payload)
      } catch (error) {
        console.error(`Event listener failed for ${eventName}`, error)
      }
    }
  }

  subscribe(listener) {
    this.listeners.add(listener)
    listener(this.getState())
    return () => {
      this.listeners.delete(listener)
    }
  }

  notify() {
    const state = this.getState()
    for (const listener of this.listeners) {
      listener(state)
    }
    this.emit("change", { state })
  }

  bindUppyEvents() {
    this.uppy.on("upload-progress", () => this.notify())

    this.uppy.on("upload-success", (file, response) => {
      const serverId = response?.body?.id || response?.body?.file?.id
      if (serverId) {
        this.uppy.setFileMeta(file.id, { serverId })
        this.remoteFiles = this.remoteFiles.filter((item) => String(item.id) !== String(serverId))
      }

      this.emit("uploadSuccess", {
        file,
        response,
        serverId,
        state: this.getState()
      })
      this.notify()
    })

    this.uppy.on("upload-error", (file, error, response) => {
      this.emit("uploadError", {
        file,
        error,
        response,
        state: this.getState()
      })
      this.notify()
    })

    this.uppy.on("file-removed", (file) => {
      this.revokePreview(file.id)
      this.notify()
    })

    this.uppy.on("file-added", () => {
      this.syncLocalOrder()
      this.notify()
    })
  }

  getState() {
    const localFiles = this.getOrderedLocalFiles()
    const remoteFiles = this.getOrderedRemoteFiles()
    const total = localFiles.reduce((sum, file) => sum + (file.progress?.bytesTotal || file.size || 0), 0)
    const uploaded = localFiles.reduce((sum, file) => sum + (file.progress?.bytesUploaded || 0), 0)
    const progress = total > 0 ? Math.round((uploaded / total) * 100) : 0

    return {
      localFiles,
      remoteFiles,
      counts: {
        local: localFiles.length,
        remote: remoteFiles.length
      },
      progress
    }
  }

  // Translates a key, with %{var} interpolation and optional pluralization.
  // For plural strings (objects keyed by pluralize(count)), pass `count` in vars.
  t(key, vars = {}) {
    let value = this.strings[key]
    if (value == null) return key

    if (typeof value === "object") {
      const index = this.pluralize(Number(vars.count ?? 0))
      value = value[index] ?? value[0] ?? ""
    }

    return String(value).replace(/%\{(\w+)\}/g, (match, name) => (
      name in vars ? String(vars[name]) : match
    ))
  }

  computeFileStatus(file) {
    if (file.progress?.uploadComplete) return this.t("statusDone")
    if (file.error) return this.t("statusError")
    if (file.progress?.uploadStarted) return this.t("statusUploading")
    return this.t("statusWaiting")
  }

  getPreviewUrl(file) {
    if (!file.type?.startsWith("image/")) return null
    const existing = this.previewUrls.get(file.id)
    if (existing) return existing

    const url = URL.createObjectURL(file.data)
    this.previewUrls.set(file.id, url)
    return url
  }

  revokePreview(fileId) {
    const url = this.previewUrls.get(fileId)
    if (!url) return
    URL.revokeObjectURL(url)
    this.previewUrls.delete(fileId)
  }

  addFiles(files) {
    files.forEach((file) => {
      try {
        this.uppy.addFile({
          name: file.name,
          type: file.type,
          data: file
        })
      } catch (error) {
        console.error("Impossible d'ajouter le fichier", file.name, error)
      }
    })

    this.syncLocalOrder()
    this.notify()
  }

  async startUpload() {
    await this.uppy.upload()
    this.notify()
  }

  cancelAll() {
    this.uppy.cancelAll()
    this.notify()
  }

  moveLocal(fileId, direction) {
    this.moveInOrder(this.localOrder, fileId, direction)

    this.emit("reorder", {
      scope: "local",
      id: fileId,
      direction,
      order: [...this.localOrder],
      persisted: false,
      state: this.getState()
    })

    this.notify()
  }

  async moveRemote(fileId, direction) {
    const previousOrder = [...this.remoteOrder]
    this.moveInOrder(this.remoteOrder, fileId, direction)
    this.notify()

    if (this.options.persistOrder) {
      try {
        const newOrder = this.remoteOrder.indexOf(String(fileId)) + 1
        const response = await this.updateRemoteFile(String(fileId), { order: newOrder })
        const updatedId = String(response?.file?.id || fileId)
        await this.loadRemoteFiles()
        fileId = updatedId
      } catch (error) {
        this.remoteOrder = previousOrder
        this.notify()
        this.emit("reorder", {
          scope: "remote",
          id: fileId,
          direction,
          order: [...this.remoteOrder],
          persisted: false,
          error,
          state: this.getState()
        })
        return
      }
    }

    this.emit("reorder", {
      scope: "remote",
      id: fileId,
      direction,
      order: [...this.remoteOrder],
      persisted: Boolean(this.options.persistOrder),
      state: this.getState()
    })

    this.notify()
  }

  async removeRemoteById(id) {
    try {
      await this.deleteRemoteById(id)
      this.emit("deleteSuccess", {
        id,
        scope: "remote",
        state: this.getState()
      })
      this.remoteFiles = this.remoteFiles.filter((file) => String(file.id) !== String(id))
      this.syncRemoteOrder()
      this.notify()
    } catch (error) {
      this.emit("deleteError", {
        id,
        scope: "remote",
        error,
        state: this.getState()
      })
      throw error
    }
  }

  async removeLocalById(id) {
    const file = this.uppy.getFile(id)
    if (file?.progress?.uploadComplete) {
      try {
        await this.deleteRemoteFile(file)
        this.emit("deleteSuccess", {
          id: file.meta?.serverId || file.response?.body?.id || file.response?.body?.file?.id || id,
          scope: "remote",
          state: this.getState()
        })
      } catch (error) {
        this.emit("deleteError", {
          id,
          scope: "remote",
          error,
          state: this.getState()
        })
        throw error
      }
    }

    this.revokePreview(id)
    this.uppy.removeFile(id)
    this.emit("deleteSuccess", {
      id,
      scope: "local",
      state: this.getState()
    })
    this.notify()
  }

  moveInOrder(order, id, direction) {
    const currentIndex = order.indexOf(String(id))
    if (currentIndex === -1) return

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
    if (targetIndex < 0 || targetIndex >= order.length) return

    const [item] = order.splice(currentIndex, 1)
    order.splice(targetIndex, 0, item)
  }

  syncLocalOrder() {
    const ids = this.uppy.getFiles().map((file) => String(file.id))
    this.localOrder = this.syncOrderArray(this.localOrder, ids)
  }

  syncRemoteOrder() {
    const ids = this.remoteFiles.map((file) => String(file.id))
    this.remoteOrder = this.syncOrderArray(this.remoteOrder, ids)
  }

  syncOrderArray(current, validIds) {
    const remaining = current.filter((id) => validIds.includes(id))
    const missing = validIds.filter((id) => !remaining.includes(id))
    return [...remaining, ...missing]
  }

  getOrderedLocalFiles() {
    this.syncLocalOrder()
    const byId = new Map(this.uppy.getFiles().map((file) => [String(file.id), file]))
    return this.localOrder.map((id) => byId.get(id)).filter(Boolean)
  }

  getOrderedRemoteFiles() {
    this.syncRemoteOrder()
    const byId = new Map(this.remoteFiles.map((file) => [String(file.id), file]))
    return this.remoteOrder.map((id) => byId.get(id)).filter(Boolean)
  }

  async deleteRemoteFile(file) {
    const serverId = file?.meta?.serverId || file?.response?.body?.id || file?.response?.body?.file?.id
    if (!serverId) return
    await this.deleteRemoteById(serverId)
  }

  async deleteRemoteById(id) {
    const url = `${this.options.deleteEndpoint}?id=${encodeURIComponent(id)}`
    const response = await fetch(url, { method: "DELETE" })
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}))
      throw new Error(payload.error || `Suppression refusee (${response.status})`)
    }
  }

  async updateRemoteFile(id, changes) {
    const response = await fetch(this.options.updateEndpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, changes })
    })

    const payload = await response.json().catch(() => ({}))
    if (!response.ok) {
      const error = new Error(payload.error || `Mise a jour fichier refusee (${response.status})`)
      this.emit("fileUpdateError", {
        id,
        changes,
        error,
        state: this.getState()
      })
      throw error
    }

    this.emit("fileUpdate", {
      id,
      changes,
      file: payload.file,
      state: this.getState()
    })

    return payload
  }

  async saveRemoteCaption(id, caption) {
    const file = this.remoteFiles.find((item) => String(item.id) === String(id))
    const previous = String(file?.caption || "")
    const next = String(caption || "").trim()

    if (previous === next) return

    try {
      const payload = await this.updateRemoteFile(String(id), { caption: next })
      this.remoteFiles = this.remoteFiles.map((item) => {
        if (String(item.id) !== String(id)) return item
        return { ...item, ...payload.file }
      })
      this.notify()
    } catch (error) {
      throw error
    }
  }

  async loadRemoteFiles() {
    try {
      const response = await fetch(this.options.listEndpoint, { method: "GET" })
      if (!response.ok) return
      const payload = await response.json().catch(() => ({}))
      if (Array.isArray(payload.files)) {
        this.remoteFiles = payload.files
        this.syncRemoteOrder()
      }
    } catch (error) {
      console.error("Chargement des fichiers serveur impossible", error)
    }
  }

  async reload() {
    await this.loadRemoteFiles()
    this.notify()
  }

  destroy() {
    this.uppy.cancelAll()
    this.uppy.close()
    for (const url of this.previewUrls.values()) {
      URL.revokeObjectURL(url)
    }
    this.previewUrls.clear()
    this.listeners.clear()
    this.eventListeners.clear()
  }
}
