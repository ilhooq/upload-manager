import { UploaderCore } from "../core/uploader-core.js"
import UploaderElement from "../ui/UploaderElement.svelte"

const ELEMENT_TAG = "uploader-widget-inner"

if (!customElements.get(ELEMENT_TAG)) {
  customElements.define(ELEMENT_TAG, UploaderElement.element)
}

export class UploaderWidget {
  constructor(target, options = {}) {
    this.root = typeof target === "string" ? document.querySelector(target) : target
    if (!this.root) {
      throw new Error("UploaderWidget: cible introuvable")
    }

    this.options = { ...options }
    this.callbacks = {
      ...(options.callbacks || {}),
      onReady: options.onReady ?? options.callbacks?.onReady,
      onChange: options.onChange ?? options.callbacks?.onChange,
      onUploadSuccess: options.onUploadSuccess ?? options.callbacks?.onUploadSuccess,
      onUploadError: options.onUploadError ?? options.callbacks?.onUploadError,
      onFileUpdate: options.onFileUpdate ?? options.callbacks?.onFileUpdate,
      onFileUpdateError: options.onFileUpdateError ?? options.callbacks?.onFileUpdateError,
      onReorder: options.onReorder ?? options.callbacks?.onReorder,
      onDeleteSuccess: options.onDeleteSuccess ?? options.callbacks?.onDeleteSuccess,
      onDeleteError: options.onDeleteError ?? options.callbacks?.onDeleteError
    }

    this.core = new UploaderCore(options)
    this.bindCoreEvents()
    this.mountUi()

    this.core.init().catch((error) => {
      console.error("Initialisation du widget impossible", error)
    })
  }

  mountUi() {
    this.root.innerHTML = ""
    this.element = document.createElement(ELEMENT_TAG)
    this.element.core = this.core
    this.root.appendChild(this.element)
  }

  bindCoreEvents() {
    this.unsubscribers = [
      this.core.on("ready", (payload) => this.callCallback("onReady", payload)),
      this.core.on("change", (payload) => this.callCallback("onChange", payload)),
      this.core.on("uploadSuccess", (payload) => this.callCallback("onUploadSuccess", payload)),
      this.core.on("uploadError", (payload) => this.callCallback("onUploadError", payload)),
      this.core.on("fileUpdate", (payload) => this.callCallback("onFileUpdate", payload)),
      this.core.on("fileUpdateError", (payload) => this.callCallback("onFileUpdateError", payload)),
      this.core.on("reorder", (payload) => this.callCallback("onReorder", payload)),
      this.core.on("deleteSuccess", (payload) => this.callCallback("onDeleteSuccess", payload)),
      this.core.on("deleteError", (payload) => this.callCallback("onDeleteError", payload))
    ]
  }

  callCallback(name, payload) {
    const cb = this.callbacks[name]
    if (typeof cb !== "function") return

    try {
      cb({ widget: this, ...payload })
    } catch (error) {
      console.error(`Callback ${name} failed`, error)
    }
  }

  getState() {
    return this.core.getState()
  }

  addFiles(files) {
    this.core.addFiles(files)
  }

  async reload() {
    await this.core.reload()
  }

  async startUpload() {
    await this.core.startUpload()
  }

  cancelAll() {
    this.core.cancelAll()
  }

  async clearCompleted() {
    await this.core.clearCompleted()
  }

  async removeLocalById(id) {
    await this.core.removeLocalById(id)
  }

  async removeRemoteById(id) {
    await this.core.removeRemoteById(id)
  }

  destroy() {
    this.unsubscribers?.forEach((unsubscribe) => unsubscribe?.())
    this.unsubscribers = []

    this.core.destroy()
    this.root.innerHTML = ""
    this.element = null
  }
}

window.UploaderWidget = UploaderWidget
