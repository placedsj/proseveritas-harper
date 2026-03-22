## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-12 - Main Thread Blocking from JSON.parse
**Learning:** `Dashboard` component was synchronously reading and parsing multiple large `localStorage` items (`evidence`, `scottLogs`, `systemAuditLogs`, `medicalRecords`) sequentially during initialization, causing significant main thread blocking and delaying render.
**Action:** Split each `localStorage.getItem` into separate macrotasks using `await new Promise(resolve => setTimeout(resolve, 0))` within the `loadStats` function to yield to the main thread and allow the UI to paint without freezing. Ensure tests wait for state to settle using `waitFor`.
