## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.
## 2025-02-12 - CSV Export Data Truncation/Injection
**Vulnerability:** Found `encodeURI` used for generating `data:text/csv` URIs in `components/ScottSchedule.tsx`. This causes data truncation if user input contains characters like `#`, as they are treated as URL fragments.
**Learning:** `encodeURI` does not encode characters like `#` and `&`. When constructing data URIs from arbitrary text, the entire payload must be properly URL-encoded.
**Prevention:** Always use `encodeURIComponent` on the data payload itself (but not the protocol prefix like `data:text/csv,`) to ensure all user input is safely encoded and downloaded.
