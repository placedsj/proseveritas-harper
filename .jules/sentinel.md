## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2024-04-10 - [Data Truncation via encodeURI]
**Vulnerability:** Found `encodeURI` used to encode a full CSV data URI in `ScottSchedule.tsx`. This causes data truncation if user input contains `#` or `&`, potentially leading to silent loss of critical evidence logs in exported files.
**Learning:** `encodeURI` does not escape characters like `#` and `&` which act as URL fragment identifiers. This is especially dangerous in data export functions where users rely on full data integrity.
**Prevention:** Always use `encodeURIComponent` on the data payload portion of a `data:` URI to ensure all characters are properly escaped and no data is lost.
