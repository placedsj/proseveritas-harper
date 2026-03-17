## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.
## 2026-03-01 - [Financial Denial of Service via Missing API Input Limits]
**Vulnerability:** Found missing `maxLength` constraints on client-side inputs (`<input>` in CoFounderChat, `<textarea>` in SpiralJournal) that map directly to external LLM/AI API payloads (Gemini). This allows users to paste excessively large payloads, leading to token exhaustion and Financial Denial of Service (DoS) attacks on the underlying LLM API.
**Learning:** Client-side inputs triggering billable API calls must enforce token limits before dispatching the request to the network to limit exposure.
**Prevention:** Client-side inputs that map directly to external LLM/AI API payloads must enforce strict `maxLength` constraints (e.g., `maxLength={2000}`) to prevent token exhaustion and Financial DoS attacks.
