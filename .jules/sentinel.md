## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-02-12 - [CSV Injection in ScottSchedule Export]
**Vulnerability:** Found unescaped user input in `ScottSchedule.tsx` CSV export. Fields starting with `=`, `+`, `-`, or `@` could be interpreted as formulas in Excel (Formula Injection), allowing command execution.
**Learning:** CSV exports must treat cell values starting with these characters as potential formulas and escape them (e.g., by prepending a single quote `'`).
**Prevention:** Implement a helper like `safeCSV` for all CSV generation logic to sanitize fields before quoting.
