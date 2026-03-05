## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2024-05-24 - Missing `noopener` on External Links
**Vulnerability:** External links (`target="_blank"`) without `rel="noopener noreferrer"` can expose the site to reverse tabnabbing attacks, allowing the new tab to access the `window.opener` object and potentially redirect the original page to a malicious site.
**Learning:** Found instances where `rel="noreferrer"` was used, but `noopener` was missing. `noopener` is the primary protection against `window.opener` abuse. While modern browsers (Chrome 88+, Safari 14+, Firefox 79+) default to `noopener` for `target="_blank"`, explicitly setting it is still a best practice for older browser support and explicit intent.
**Prevention:** Always use `rel="noopener noreferrer"` for external links with `target="_blank"`.
