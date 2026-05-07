## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.
## 2025-05-07 - [Missing noopener on target=_blank]
**Vulnerability:** Found anchor tags using target="_blank" without the rel="noopener" attribute in GovBenefits.tsx and LegalSRL.tsx.
**Learning:** While modern browsers implicitly add noopener for target="_blank", explicitly setting it is a strict security standard to prevent reverse tabnabbing attacks where the newly opened page can manipulate the window.opener object.
**Prevention:** Always use rel="noopener noreferrer" when using target="_blank".
