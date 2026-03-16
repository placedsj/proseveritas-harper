## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-03-01 - [Financial DoS in AI Endpoints via Missing Input Limits]
**Vulnerability:** Found missing input length limits on the `CoFounderChat.tsx` `<input>` field, which sends user input directly to the Google Gemini AI API. This omission allows malicious or erroneous massive strings to be sent to the API, leading to potential token exhaustion, rapid API quota consumption, or increased financial costs (Financial DoS).
**Learning:** Client-side interactions with external LLM/AI APIs must always enforce strict length constraints at the point of entry. Relying solely on the UI's standard usability patterns does not protect backend API limits or cost structures from massive payload abuse.
**Prevention:** Always add a `maxLength` attribute to any text inputs (or validate string length before fetch) that map directly to API payload contexts, especially generative AI prompts.
