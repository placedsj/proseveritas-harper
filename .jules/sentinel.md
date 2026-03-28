## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2024-05-18 - Missing LLM Input Constraints
**Vulnerability:** Client-side inputs mapped directly to external LLM/AI API payloads lacked strict length limits.
**Learning:** Unconstrained inputs mapping to API prompts pose a significant risk of token exhaustion and Financial Denial of Service (DoS) attacks.
**Prevention:** Client-side inputs that map directly to external LLM/AI API payloads (like Gemini) must enforce strict `maxLength` constraints (e.g., `maxLength={2000}`).
