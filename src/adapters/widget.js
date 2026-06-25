import { UploaderCore } from "../core/uploader-core.js"
import UploaderElement from "../ui/UploaderElement.svelte"

const ELEMENT_TAG = "upload-manager"

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
      onDeleteError: options.onDeleteError ?? options.callbacks?.onDeleteError,
      onErrorAddFile: options.onErrorAddFile ?? options.callbacks?.onErrorAddFile
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
    const eventMap = {
      ready: "onReady",
      change: "onChange",
      uploadSuccess: "onUploadSuccess",
      uploadError: "onUploadError",
      fileUpdate: "onFileUpdate",
      fileUpdateError: "onFileUpdateError",
      reorder: "onReorder",
      deleteSuccess: "onDeleteSuccess",
      deleteError: "onDeleteError",
      errorAddFile: "onErrorAddFile"
    }

    this.unsubscribers = Object.entries(eventMap)
      .filter(([, callbackName]) => typeof this.callbacks[callbackName] === "function")
      .map(([eventName, callbackName]) =>
        this.core.on(eventName, (payload) => this.callCallback(callbackName, payload))
      )
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
