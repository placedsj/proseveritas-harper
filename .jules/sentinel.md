## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-02-13 - [Reverse Tabnabbing Vulnerability]
**Vulnerability:** Found links using `target="_blank"` with `rel="noreferrer"` but missing `noopener`. This exposes the application to reverse tabnabbing attacks.
**Learning:** Even though modern browsers implicitly add `noopener`, explicit `noopener` prevents malicious manipulation of `window.opener` across all browsers.
**Prevention:** Always use `rel="noopener noreferrer"` whenever using `target="_blank"`.
