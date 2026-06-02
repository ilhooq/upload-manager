# AGENTS.md

This file provides guidance to AI agent when working with code in this repository.

## Sumary

This is a js library which provides an upload manager widget like Blueimp 

## Commands

- `npm run dev` — Vite dev server, opens `example/index-dev.html` which imports the widget from `src/index.js` (no build needed for frontend iteration).
- `npm run backend` — PHP built-in server on `localhost:8081` serving `example/app.php`. The Vite dev server proxies `/example/app.php` to it (see `vite.config.js`). Both must run together for the demo to work end-to-end.
- `npm run build` — Vite library build into `dist/` (ES + UMD bundles, single CSS file). Entry: `src/index.js`. `example/index.html` uses these built artifacts (whereas `index-dev.html` uses sources).
- `npm run preview` — serves the built `dist/` output.

No test suite, linter, or typecheck is configured.

## Architecture

This is a Svelte 5 file-uploader library packaged as a custom element + JS class wrapper around Uppy. UI strings go through an i18n layer; the default locale is English (see **i18n** below).

**Three-layer structure — keep the boundaries:**

1. `src/core/uploader-core.js` — `UploaderCore` owns all state and side effects: Uppy instance, remote file list, ordering (`localOrder`/`remoteOrder`), preview URLs, server requests (GET list, POST upload via Uppy XHR, PATCH update/reorder, DELETE). Framework-agnostic, no DOM. Exposes a state subscription (`subscribe`) and a typed event bus (`on`/`emit`) — these are distinct: `subscribe` fires the full state on every change; `on`/`emit` carries named domain events (`ready`, `uploadSuccess`, `reorder`, `deleteError`, …).
2. `src/ui/UploaderElement.svelte` — Svelte 5 component compiled as a custom element (`<upload-manager>`, `shadow: "none"`). Receives the core via a `core` prop assigned imperatively on the DOM element (`element.core = this.core`), then calls `core.subscribe(...)` for renders. Stateless beyond UI-only flags (drag-over, per-row caption-saving).
3. `src/adapters/widget.js` — `UploaderWidget` is the public entry. Wires options → core, mounts the custom element into the target, bridges core events to user-supplied callbacks (`onUploadSuccess`, `onReorder`, …). It also registers the custom element tag once and exposes `UploaderWidget` on `window`.

When changing behavior, locate it by layer: state/network → core; rendering → svelte component; option/callback shape → adapter.

**i18n.** UI strings live in locale packs under `src/locales/` (`fr.js`, `en.js`, registered in `index.js`). Each pack is `{ strings: {...}, pluralize: (n) => index }`. The `locale` option accepts a known key (`"en"`, `"fr"`), or a custom/partial pack object. `resolveLocale(locale, labels)` (in the core) merges `default pack → chosen pack → labels` — the legacy `labels` option still works as a per-key override. The component renders every string via `core.t(key, vars)`, which does `%{var}` interpolation and pluralization (pass `count` in vars for plural-form strings). `core.labels` remains an alias of the resolved strings for backward compatibility. When adding a user-facing string: add the key to **all** locale packs and render it with `core.t(...)` — never hardcode text (including `aria-label`/`alt`) in the Svelte component.

**Local vs remote files are two independent ordered lists.** `localFiles` = files in Uppy (pending or just-uploaded in this session); `remoteFiles` = files fetched from `listEndpoint`. Each has its own order array. On `upload-success`, the file stays in Uppy's list — the matching remote entry (if any) is filtered out to avoid duplicate rows. Reordering remote files calls PATCH with `{ changes: { order } }` when `persistOrder` is true and rolls back on failure.

**Server contract** (see `example/app.php` for the reference implementation; all four endpoints can point to the same URL and dispatch by HTTP method):
- `GET listEndpoint` → `{ files: [{ id, name, size, type, url, caption?, order?, ... }] }`
- `POST endpoint` (multipart, field name from `fieldName` option) → `{ id, file, files }`; the `serverId` extracted is `response.body.id` or `response.body.file.id`.
- `PATCH updateEndpoint` body `{ id, changes: { order?, caption?, ... } }` → `{ id, file }`. `order` is 1-based.
- `DELETE deleteEndpoint?id=<id>` → `{ deleted }`.

The PHP demo persists ordering and captions in `example/uploads/.meta.json`; uploaded file names are sanitized and de-duplicated with a numeric suffix.

## Conventions

- Source code comments are in English. User-facing strings are never hardcoded — they belong in the locale packs (`src/locales/`) and are rendered via `core.t(...)`.
- Svelte 5 runes (`$props`, `$state`) — not Svelte 4 syntax.
- The custom element tag is `upload-manager` (renamed from `uploader-widget` — the library `name` in the Vite config and bundle filename also reflect this).
