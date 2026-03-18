## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.
## 2025-03-18 - Prevent Financial DoS via Token Exhaustion in Gemini API
**Vulnerability:** The Co-Founder chat input in `components/CoFounderChat.tsx` lacked a `maxLength` constraint. User input is sent directly to the external Gemini API, which charges per token and has rate limits.
**Learning:** Unbounded inputs mapping directly to external LLM/AI API payloads (like Gemini) expose the application to token exhaustion and Financial Denial of Service (DoS) attacks.
**Prevention:** Client-side inputs that map to LLM payloads must enforce strict `maxLength` constraints (e.g., `maxLength={2000}`) to prevent overwhelming requests.
