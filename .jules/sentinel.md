## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-02-14 - [LLM Token Exhaustion / Financial DoS]
**Vulnerability:** Unrestricted client-side inputs mapping directly to the Gemini API allowed arbitrary payload lengths, risking token exhaustion and Financial DoS.
**Learning:** Client-side inputs directly feeding AI APIs must have strict length constraints as the first layer of defense against payload bloat.
**Prevention:** Enforce `maxLength={2000}` on all inputs and textareas that send data to external LLM/AI APIs.
