## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.
## 2026-05-20 - [Missing Input Length Limit in AI Chat]
**Vulnerability:** The AI chat input field lacked a length limit, allowing arbitrarily large strings to be sent to the backend/API.
**Learning:** Unrestricted input length to external AI APIs can lead to DoS (client-side freezing, network saturation) and excessive token billing costs.
**Prevention:** Always enforce a reasonable upper bound on user input queries using the HTML maxLength attribute or backend validation.
