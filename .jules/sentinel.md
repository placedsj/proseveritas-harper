## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-05-21 - [Token Exhaustion Prevention]
**Vulnerability:** Missing input length limits on CoFounderChat and SpiralJournal inputs that are sent to external LLM APIs.
**Learning:** Unrestricted input length on fields interacting with LLM APIs can lead to token exhaustion or unexpected API costs.
**Prevention:** Added `maxLength` constraints to inputs before they interact with external APIs.
