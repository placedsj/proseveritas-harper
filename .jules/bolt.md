## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-03-24 - Global Search Max Results Limit
**Learning:** `GlobalSearch` was rendering an unbounded number of DOM nodes for broad queries, leading to massive React reconciliation times and UI lag.
**Action:** Capped the maximum rendered search results to 50 by slicing the sorted array before updating state. This bounds the DOM node count and keeps reconciliation well under the 16ms frame budget.
