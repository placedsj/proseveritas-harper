## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.
## 2024-04-15 - Unhandled Exception in JSON.parse
**Vulnerability:** React components were parsing localStorage directly, which can crash the component if the storage contains malformed or tampered data.
**Learning:** Client-side storage is untrusted input and can be externally modified.
**Prevention:** Always wrap JSON.parse in a try-catch block when initializing state from client-side storage.
