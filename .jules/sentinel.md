## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-03-05 - [CSV Injection in ScottSchedule]
**Vulnerability:** Found CSV Injection (Formula Injection) vulnerability in `ScottSchedule.tsx` export function. Malicious user input starting with `=`, `+`, `-`, or `@` could execute formulas in spreadsheet software.
**Learning:** Simply wrapping fields in double quotes is insufficient for CSV security. Excel/Calc interpret cells starting with specific characters as formulas regardless of quotes.
**Prevention:** Prepend a single quote (`'`) to any field starting with `=`, `+`, `-`, or `@` to force it to be treated as text.
