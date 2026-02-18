## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-02-12 - [CSV Formula Injection in Scott Schedule]
**Vulnerability:** Found unsanitized CSV export functionality in `ScottSchedule.tsx`. User input (e.g., incident descriptions starting with `=`) could be executed as formulas by spreadsheet software (Excel, Sheets), leading to potential command execution or data exfiltration.
**Learning:** Exporting raw strings to CSV without sanitizing leading characters (`=`, `+`, `-`, `@`) exposes users to Formula Injection attacks. Standard CSV quoting does not prevent formula execution.
**Prevention:** Sanitize all user-controlled data before exporting to CSV. Prepend a single quote `'` to fields starting with dangerous characters to force them to be treated as text.
