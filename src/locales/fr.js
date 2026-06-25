// French locale pack.
// A string can be a plain string, or an object of plural forms indexed by the
// result of `pluralize(count)` (see the `count` key passed to t()).
// Interpolation uses the %{variable} syntax.
export default {
  pluralize: (n) => (n === 1 ? 0 : 1),
  strings: {
    // Toolbar
    addFiles: "Ajouter des fichiers",
    startUpload: "Démarrer l'upload",
    cancel: "Annuler",

    // Drop zone
    dropzone: 'Glissez-déposez vos fichiers ici ou utilisez « Ajouter des fichiers ».',
    ariaDropzone: "Zone de dépôt",
    ariaGlobalProgress: "Progression globale",

    // Table
    empty: "Aucun fichier ajouté",
    headerPreview: "Aperçu",
    headerFile: "Fichier",
    headerSize: "Taille",
    headerCaption: "Légende",
    headerStatus: "Statut",
    headerProgress: "Progression",
    headerActions: "Actions",

    // File rows
    serverState: "Déjà sur serveur",
    captionPlaceholder: "Ajouter une légende",
    previewAlt: "Aperçu de %{name}",
    fallbackFileName: "fichier",
    unknownType: "type inconnu",

    // Statuses
    statusDone: "Terminé",
    statusError: "Erreur",
    statusUploading: "Upload en cours",
    statusWaiting: "En attente",

    // Actions
    moveUp: "Monter",
    moveDown: "Descendre",
    remove: "Supprimer",

    // Errors
    errorAddFile: "Impossible d'ajouter le fichier %{name}",
    errorDelete: "Suppression refusée (%{status})",
    errorUpdate: "Mise à jour du fichier refusée (%{status})",
    errorLoadRemote: "Chargement des fichiers serveur impossible"
  }
}
