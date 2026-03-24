## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-02-12 - [Unbounded LLM Input Leads to Token Exhaustion]
**Vulnerability:** The client-side inputs in `CoFounderChat.tsx` and `SpiralJournal.tsx` that map directly to external LLM/AI API payloads (Gemini) lacked strict `maxLength` constraints. This could lead to token exhaustion and Financial Denial of Service (DoS) attacks.
**Learning:** We must not trust user input lengths when connecting to metered, third-party APIs. Without hard limits, large payloads can drain available tokens rapidly or result in surprise billing.
**Prevention:** Always enforce strict `maxLength` constraints (e.g., `maxLength={2000}`) on client-side inputs that feed directly into external LLM/AI API payloads to prevent token exhaustion.
