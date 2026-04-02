## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.
## 2026-02-12 - [Missing Length Limits on LLM Inputs]
**Vulnerability:** Client-side inputs in `CoFounderChat` and `SpiralJournal` that map directly to external LLM/AI API payloads (Gemini) lacked `maxLength` constraints, allowing potential token exhaustion and Financial Denial of Service (DoS) attacks.
**Learning:** Unrestricted user inputs passed directly to paid APIs can lead to uncontrolled costs and resource exhaustion.
**Prevention:** Client-side inputs that map directly to external LLM/AI API payloads must enforce strict `maxLength` constraints (e.g., `maxLength={2000}`).
