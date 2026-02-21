## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-02-21 - [CSV Formula Injection in ScottSchedule]
**Vulnerability:** User input fields (`theSay`, `theFact`, `exhibitRef`, `statuteTag`) in `ScottSchedule.tsx` were exported to CSV without sanitization, allowing formula injection if values started with `=`, `+`, `-`, or `@`.
**Learning:** Exporting user-generated content to CSV requires specific sanitization beyond just escaping delimiters (quotes), as spreadsheet software executes cells starting with formula triggers.
**Prevention:** Always sanitize CSV fields by prepending a single quote `'` if the value starts with `=`, `+`, `-`, or `@` to force the spreadsheet to treat it as text.
