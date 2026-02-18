## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2025-05-23 - [CSV Injection in Scott Schedule]
**Vulnerability:** The `ScottSchedule` component exported user-generated content directly to CSV without sanitizing fields starting with `=`, `+`, `-`, or `@`. This allowed CSV Formula Injection (RCE risk if opened in Excel).
**Learning:** Even though quotes were escaped for CSV format, leading characters that trigger formula execution were not handled.
**Prevention:** Always sanitize user input before export by prepending a single quote (`'`) to dangerous start characters. Use a helper like `safeCSVField`.
