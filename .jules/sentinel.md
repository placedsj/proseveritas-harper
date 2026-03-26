## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.
## 2025-03-26 - Token Exhaustion and Financial DoS Prevention
**Vulnerability:** User inputs connected to the Gemini API (`CoFounderChat` and `SpiralJournal`) lacked length constraints. This allowed unbounded input sizes to be sent to the LLM, risking token exhaustion and Financial Denial of Service (DoS) attacks.
**Learning:** Client-side inputs that directly map to external AI/LLM API payloads must strictly control the size of user input to avoid unbounded token consumption, especially in single-user setups where API keys might be directly exposed or easily accessible.
**Prevention:** Always enforce strict `maxLength` constraints (e.g., `maxLength={2000}`) on client-side input elements (`<input>`, `<textarea>`) that feed into external API calls.
