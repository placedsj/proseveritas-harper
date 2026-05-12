## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.
## 2026-05-12 - Remove unsafe-eval from CSP
**Vulnerability:** Found 'unsafe-eval' in Content-Security-Policy script-src.
**Learning:** The 'unsafe-eval' directive allows execution of code from strings, which is a major XSS risk. No parts of the app actually required eval.
**Prevention:** Avoid allowing 'unsafe-eval' in the CSP unless absolutely necessary, and prefer using secure coding practices without eval.
