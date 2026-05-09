## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.
## 2026-02-12 - [Hardcoded API Key Leakage via process.env]
**Vulnerability:** Found API key being exposed via process.env definitions in vite.config.ts and read in services/geminiService.ts.
**Learning:** Exposing secrets via process.env in a Vite application is insecure and can lead to token exhaustion or leakage.
**Prevention:** Use import.meta.env with VITE_ prefix to securely manage environment variables in Vite applications.
