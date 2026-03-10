## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-03-01 - [Reverse Tabnabbing Vulnerability via target="_blank"]
**Vulnerability:** Found `target="_blank"` links using `rel="noreferrer"` but missing `noopener` in `LegalSRL.tsx` and `GovBenefits.tsx`. This allows the newly opened tab to retain a reference to the `window.opener` object, potentially allowing the destination page to redirect the original page to a malicious URL (Reverse Tabnabbing).
**Learning:** While `noreferrer` implies `noopener` in some modern browsers, explicitly defining both is necessary for consistent cross-browser security and clearer intent. Omitting `noopener` when using `target="_blank"` leaves older browsers vulnerable.
**Prevention:** Always use `rel="noopener noreferrer"` together whenever opening external links with `target="_blank"`.
