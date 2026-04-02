## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-13 - Unbounded List Rendering Bottleneck
**Learning:** In `GlobalSearch.tsx`, unbounded search results caused massive DOM updates and UI lag when broad queries returned thousands of items. This codebase anti-pattern of passing unpaginated/unbounded arrays to React state blocked the main thread.
**Action:** Always slice or paginate large filtered arrays (e.g., `.slice(0, 50)`) before setting them to state to limit DOM nodes.
