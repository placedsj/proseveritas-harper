## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-02-12 - [Missing Input Length Limits for LLM Payloads]
**Vulnerability:** Client-side inputs that map directly to external LLM/AI API payloads (e.g., in CoFounderChat and SpiralJournal) lacked `maxLength` constraints. This can lead to token exhaustion and Financial Denial of Service (DoS) attacks.
**Learning:** Unrestricted inputs connected to paid external APIs are a direct financial risk, not just a UI issue.
**Prevention:** Always enforce strict `maxLength` constraints on any user input that is forwarded to an external API, especially LLMs.
