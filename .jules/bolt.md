## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-03-25 - GlobalSearch DOM Updates
**Learning:** `GlobalSearch` was rendering all search results to the DOM without limits, causing massive UI lag and main thread blocking on broad queries with large localized datasets.
**Action:** Sliced the sorted search results array (e.g., `.slice(0, 50)`) before setting it to state to limit rendered results, preventing performance bottlenecks associated with excessive DOM nodes.
