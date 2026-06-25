// English locale pack (default locale).
export default {
  pluralize: (n) => (n === 1 ? 0 : 1),
  strings: {
    // Toolbar
    addFiles: "Add files",
    startUpload: "Start upload",
    cancel: "Cancel",

    // Drop zone
    dropzone: 'Drag and drop your files here or use "Add files".',
    ariaDropzone: "Drop zone",
    ariaGlobalProgress: "Overall progress",

    // Table
    empty: "No file added",
    headerPreview: "Preview",
    headerFile: "File",
    headerSize: "Size",
    headerCaption: "Caption",
    headerStatus: "Status",
    headerProgress: "Progress",
    headerActions: "Actions",

    // File rows
    serverState: "Already on server",
    captionPlaceholder: "Add a caption",
    previewAlt: "Preview of %{name}",
    fallbackFileName: "file",
    unknownType: "unknown type",

    // Statuses
    statusDone: "Done",
    statusError: "Error",
    statusUploading: "Uploading",
    statusWaiting: "Waiting",

    // Actions
    moveUp: "Move up",
    moveDown: "Move down",
    remove: "Remove",

    // Errors
    errorAddFile: "Could not add file %{name}",
    errorDelete: "Deletion refused (%{status})",
    errorUpdate: "File update refused (%{status})",
    errorLoadRemote: "Could not load server files"
  }
}
