## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.
## 2024-05-18 - Missing Length Limitations on LLM Payload Inputs
**Vulnerability:** The application's inputs mapped to the Gemini API (`CoFounderChat` input and `SpiralJournal` textarea) lacked `maxLength` constraints, allowing arbitrarily large input.
**Learning:** This exposes the application to Financial Denial of Service (DoS) and potential token exhaustion by enabling users to send excessively large payloads to the LLM backend. Client-side limitations must complement backend token limits.
**Prevention:** All client-side inputs that send data directly to external AI/LLM APIs must enforce a strict `maxLength` limit (e.g., `maxLength={2000}`) to prevent token abuse.
