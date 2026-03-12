## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-02-13 - [CSP XSS Vulnerability]
**Vulnerability:** Found `unsafe-eval` usage in `index.html`'s Content Security Policy meta tag. This allowed execution of arbitrary strings as code, significantly increasing the risk of XSS attacks.
**Learning:** The application's CSP was overly permissive in `script-src`, likely a leftover from development or a misunderstanding of bundler requirements. Removing it hardens the application against a major attack vector without breaking functionality.
**Prevention:** Always maintain a strict CSP. Never allow `unsafe-eval` or `unsafe-inline` in `script-src` unless absolutely necessary and completely understood, and prefer nonces or hashes for inline scripts.
