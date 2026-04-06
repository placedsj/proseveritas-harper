## 2025-03-01 - [Missing ARIA labels on icon-only buttons]
**Learning:** Found a recurring pattern of missing `aria-label`s on icon-only action buttons (e.g., close buttons, delete buttons, view details buttons) across multiple components (`SystemAudit`, `SpiralJournal`, `HealthRehab`, `ScottSchedule`).
**Action:** Ensure all icon-only interactive elements explicitly define an `aria-label` for screen reader accessibility.
