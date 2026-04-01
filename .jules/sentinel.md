## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-02-12 - [Missing Input Limits on AI API Endpoints]
**Vulnerability:** Found unbounded text inputs (`<input>` and `<textarea>`) in `CoFounderChat.tsx` and `SpiralJournal.tsx` that map directly to external LLM/AI API payloads (Gemini). This allows potential token exhaustion and Financial Denial of Service (DoS) attacks.
**Learning:** Client-side inputs acting as prompts for external AI APIs must be strictly size-limited to prevent malicious or accidental transmission of massive text payloads.
**Prevention:** Always enforce strict `maxLength` constraints (e.g., `maxLength={2000}`) on input fields that submit data to external LLM services.
