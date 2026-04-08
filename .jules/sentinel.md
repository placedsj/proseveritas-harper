## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-02-12 - [Data URI Truncation in CSV Export]
**Vulnerability:** Found `encodeURI` used on a full `data:` URI in `ScottSchedule.tsx`. This causes characters like `#` and `&` in user input to be interpreted as URL fragments, silently truncating the exported CSV data.
**Learning:** `encodeURI` does not escape characters like `#` or `&`. When constructing `data:` URIs, the payload must be escaped with `encodeURIComponent`.
**Prevention:** Apply `encodeURIComponent` exclusively to the data payload portion of a `data:` URI, never `encodeURI` to the entire string.
