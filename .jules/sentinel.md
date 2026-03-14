## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-02-12 - [Insecure CSP Directive]
**Vulnerability:** Found `'unsafe-eval'` usage in the `script-src` directive of the Content Security Policy (CSP) in `index.html`. This allows arbitrary string execution as JavaScript (e.g., via `eval()`, `setTimeout(string)`, etc.), which significantly increases the risk and impact of Cross-Site Scripting (XSS) attacks.
**Learning:** `'unsafe-eval'` was likely added during development or to support a specific library, but it breaks the core protection of CSP against XSS.
**Prevention:** Maintain strict CSP headers. Avoid using `'unsafe-eval'` in `script-src` entirely. Refactor code or configure dependencies to not require runtime string evaluation.
