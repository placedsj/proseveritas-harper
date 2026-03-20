## 2026-02-12 - [Stored XSS in GlobalSearch]
**Vulnerability:** Found `dangerouslySetInnerHTML` usage in `GlobalSearch.tsx` rendering `result.subtitle` which is derived from user input (e.g., `localStorage`). This allows Stored XSS if `localStorage` is compromised or manipulated.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily as the content was plain text (or simple string interpolation) without intended HTML markup.
**Prevention:** Always default to `{text}` for rendering strings. Only use `dangerouslySetInnerHTML` when absolutely necessary and always sanitize input (e.g., with DOMPurify) before rendering.

## 2026-03-20 - [Missing Input Length Limits (DoS risk)]
**Vulnerability:** Found missing length limits on inputs (CoFounderChat and SpiralJournal) that map directly to the LLM/Gemini API via getCoFounderResponse and getRealityCheck. This could lead to token exhaustion and a Financial Denial of Service (DoS) attack, even in single-user apps.
**Learning:** Client-side inputs interfacing with external APIs (especially AI services billed by tokens) require explicit constraints to prevent abuse or accidental massive data submissions.
**Prevention:** Always enforce strict maxLength constraints (e.g., maxLength={2000}) on client-side inputs that send data to LLM/AI APIs.