## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-02-12 - [Prompt Injection in Gemini Service]
**Vulnerability:** User inputs were directly interpolated into LLM prompts without sanitization, allowing potential prompt injection attacks.
**Learning:** Even when using advanced LLMs, inputs must be treated as untrusted data. String interpolation of raw user input into a prompt template is equivalent to SQL injection.
**Prevention:** Use `JSON.stringify()` to serialize user inputs before embedding them in prompts. This ensures the LLM treats them as data strings rather than executable instructions.
