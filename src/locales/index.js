import fr from "./fr.js"
import en from "./en.js"

// Registry of locales shipped with the library.
// Consumers may also pass their own { strings, pluralize } pack directly
// through the `locale` option.
export const locales = { fr, en }

export const DEFAULT_LOCALE = "en"

export { fr, en }
