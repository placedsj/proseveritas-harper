## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.
## 2025-05-19 - Added try-catch for JSON.parse
**Vulnerability:** Application components were crashing when trying to `JSON.parse` malformed or manipulated localStorage entries.
**Learning:** `JSON.parse` is vulnerable to malformed strings and should always be defensively wrapped.
**Prevention:** Always use `try...catch` blocks when hydrating state from client-side storage to fallback to safe defaults.
