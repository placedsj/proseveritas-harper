## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-02-12 - [Removed unsafe-eval from CSP]
**Vulnerability:** Found `'unsafe-eval'` in Content-Security-Policy `script-src` directive. This allows execution of strings as code, increasing XSS risk.
**Learning:** `unsafe-eval` was likely added for ease of development but should not be present in a production CSP.
**Prevention:** Avoid allowing `'unsafe-eval'` in CSP to enforce stricter script execution policies and mitigate potential XSS vectors.
