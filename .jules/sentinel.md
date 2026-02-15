## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-02-15 - [CSV Injection in Scott Schedule]
**Vulnerability:** Found CSV Injection (Formula Injection) vulnerability in `ScottSchedule.tsx` export function, where user input starting with `=`, `+`, `-`, or `@` could be executed as formulas in spreadsheet software.
**Learning:** React/JS string template literals do not automatically sanitize for CSV specific vulnerabilities like Formula Injection.
**Prevention:** Use a dedicated `escapeCSV` helper function (like the one added in `utils/security.ts`) that prepends a single quote to dangerous prefixes and properly escapes double quotes.
