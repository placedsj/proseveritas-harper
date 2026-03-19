## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2026-03-19 - DOM Updates in Search Results
**Learning:** The `GlobalSearch` component was rendering an unbounded number of search results into the DOM simultaneously, leading to massive reconciliation overhead and UI sluggishness during active searches against large datasets.
**Action:** Limited the sorted search array by applying `.slice(0, 50)` before setting it to state, capping DOM node instantiation while preserving search accuracy.
