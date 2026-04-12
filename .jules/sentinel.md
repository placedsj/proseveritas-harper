## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2025-04-12 - URI Data Payload Injection Fix
**Vulnerability:** Encoding an entire `data:text/csv` URI using `encodeURI` fails to properly escape characters like `#` and `&`.
**Learning:** `encodeURI` is insufficient for data URIs because it ignores URI syntax characters, which may exist within the payload.
**Action:** Separated the protocol prefix from the data payload, applying `encodeURIComponent` strictly to the payload before concatenating it back to the prefix to ensure safe file generation.
