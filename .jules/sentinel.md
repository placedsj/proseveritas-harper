## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-03-19 - [Token Exhaustion Risk]
**Vulnerability:** Found unbounded text inputs in `CoFounderChat.tsx` and `SpiralJournal.tsx` that mapped directly to Gemini LLM/AI API calls. This allowed potential token exhaustion and Financial Denial of Service (DoS) attacks.
**Learning:** Client-side inputs that directly map to external APIs without length restrictions represent a critical financial and operational risk due to potential exploitation.
**Prevention:** Always enforce strict `maxLength` constraints (e.g., `maxLength={2000}`) on client-side inputs that are used as payloads for LLM/AI API requests to mitigate token exhaustion.
