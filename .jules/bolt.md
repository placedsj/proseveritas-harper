## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-12 - DOM Rendering Optimization in Search
**Learning:** `GlobalSearch` was sorting and attempting to render potentially thousands of matched DOM nodes simultaneously on broad search queries, causing layout thrashing and massive main-thread blocking.
**Action:** Implemented an O(1) rendering cap by chaining `.slice(0, 50)` directly after the sort operation. This guarantees React never has to render more than 50 list items at once, restoring smooth UI performance.
