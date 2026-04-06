## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.
## 2026-02-12 - [Unhandled JSON.parse of LocalStorage]
**Vulnerability:** Unhandled `JSON.parse()` calls on untrusted/tamperable `localStorage` data can cause component crashes and leak stack traces via error boundaries.
**Learning:** Client-side storage must be treated as untrusted user input, susceptible to malformed data.
**Prevention:** Always wrap `JSON.parse()` in a `try-catch` block when reading from `localStorage` to fail securely.
