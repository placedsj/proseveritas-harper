## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-13 - Search Rendering Lag
**Learning:** `GlobalSearch` was rendering potentially thousands of DOM elements for broad queries, leading to massive UI lag. Sorting the large array wasn't the main bottleneck; the actual rendering of all matched elements was.
**Action:** Always cap list results (e.g., `.slice(0, 50)`) before setting them to component state to prevent rendering hundreds/thousands of un-virtualized DOM nodes.
