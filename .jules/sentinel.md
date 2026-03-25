## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-02-12 - [Missing Input Limits on AI API Endpoints]
**Vulnerability:** Found `CoFounderChat` and `SpiralJournal` sending user inputs directly to the Gemini API (`generateContent`) without any `maxLength` constraints on the `<input>` or `<textarea>` elements. This is a Financial DoS risk, as an attacker could paste an extremely long payload to exhaust tokens and spike billing.
**Learning:** Client-side inputs that map directly to external LLM/AI APIs must be explicitly constrained at the boundary to prevent excessive token consumption.
**Prevention:** Always apply strict `maxLength` attributes to form fields that feed into paid APIs, and validate payload length before making the network request.
