## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-02-13 - [Missing Input Length Limits on LLM APIs]
**Vulnerability:** Client-side inputs that directly feed into external AI API calls (Gemini) lacked `maxLength` constraints (`CoFounderChat.tsx` and `SpiralJournal.tsx`).
**Learning:** Unrestricted input size allows malicious actors or runaway scripts to paste massive payloads, exhausting token limits and causing a Financial Denial of Service (DoS) attack.
**Prevention:** Always enforce strict `maxLength` constraints (e.g., `maxLength={2000}`) on UI inputs that map directly to external LLM/AI API payloads.
