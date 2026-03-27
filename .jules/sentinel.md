## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-02-12 - [Denial of Service Risk in AI Inputs]
**Vulnerability:** Client-side inputs feeding external LLM/AI API payloads lacked length constraints (`maxLength`), risking token exhaustion and Financial DoS.
**Learning:** Any user input passed directly to an LLM service must be constrained on the client (and server) to prevent abuse and excessive costs.
**Prevention:** Enforce strict `maxLength` constraints (e.g., `maxLength={2000}`) on all `<input>` and `<textarea>` elements mapped to AI API endpoints.
