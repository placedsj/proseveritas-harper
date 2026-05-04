## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.
## 2025-03-01 - CSV Data URI Payload Truncation
**Vulnerability:** Found encodeURI being used to encode the entire data:text/csv string in components/ScottSchedule.tsx.
**Learning:** encodeURI fails to escape characters like # and &, causing payload truncation. Also, encoding the entire protocol prefix data:text/csv;charset=utf-8, with encodeURIComponent breaks the URI.
**Prevention:** Only apply encodeURIComponent strictly to the data payload itself and NOT to the protocol prefix.
