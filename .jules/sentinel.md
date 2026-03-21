## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.
## 2026-03-21 - [Financial DoS via Unbounded LLM Input]
**Vulnerability:** Found unbounded input and textarea fields in CoFounderChat.tsx and SpiralJournal.tsx that directly map to external AI API payloads (Gemini). This allows users to paste excessively large payloads, leading to token exhaustion and Financial DoS.
**Learning:** Client-side inputs connected to LLM APIs must enforce strict character limits because external API costs scale directly with input length.
**Prevention:** Always enforce strict maxLength constraints (e.g., maxLength={2000}) on UI components that send data to LLM/AI APIs to prevent token exhaustion attacks.
