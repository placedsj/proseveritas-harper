## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-02-12 - [Unhandled JSON Parse Exception]
**Vulnerability:** Found missing `try-catch` blocks around `JSON.parse(localStorage.getItem(...))` in state initializers, allowing malformed client-side data to crash components.
**Learning:** Client-side storage cannot be trusted and must be treated as untrusted user input.
**Prevention:** Always wrap `JSON.parse` operations on `localStorage` data in a `try-catch` block to ensure components fail securely.
