## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.
## 2024-05-18 - [Data Truncation/Injection in Data URIs]
**Vulnerability:** Found `encodeURI` used instead of `encodeURIComponent` for generating CSV data URIs in `ScottSchedule.tsx`. This causes data truncation if characters like `#` or `&` are present, as they act as URL fragment/query delimiters.
**Learning:** `encodeURI` does not escape reserved URL characters, allowing user input containing `#` to break the data URI scheme structure.
**Prevention:** Always use `encodeURIComponent` when embedding user-controlled data or file contents into a Data URI payload, ensuring the data is fully percent-encoded.
