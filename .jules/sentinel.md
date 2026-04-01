## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2025-03-05 - [LLM Token Exhaustion via Unbounded Inputs]
**Vulnerability:** Client-side input fields in `CoFounderChat` and `SpiralJournal` mapped directly to Gemini API payloads without length constraints. This could allow token exhaustion and Financial Denial of Service (DoS) attacks by pasting massive strings.
**Learning:** Any user input that acts as an LLM prompt must be bounded on the client side to prevent excessive token generation and unexpected API costs.
**Prevention:** Enforce strict `maxLength` constraints (e.g., `maxLength={2000}`) on all client-side inputs that submit data to external LLM/AI APIs.
