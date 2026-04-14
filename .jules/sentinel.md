## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.
## 2026-02-13 - [CSV Data Truncation / Injection via URI Encoding]
**Vulnerability:** `encodeURI` was used on the entire `data:text/csv` URI in `ScottSchedule.tsx`, causing characters like `#` and `&` to be unescaped, which truncated the CSV payload.
**Learning:** `encodeURI` does not escape many special characters used in query strings or URIs. This leads to data loss when the payload contains such characters.
**Prevention:** Apply `encodeURIComponent` strictly to the data payload itself before appending it to the unescaped protocol prefix (`data:text/csv;charset=utf-8,`).
