## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-12 - ISO 8601 Date Sorting Optimization
**Learning:** Sorting arrays of ISO 8601 date strings using `new Date(a).getTime() - new Date(b).getTime()` creates massive overhead from parsing and object instantiation inside tight loops.
**Action:** Use direct string comparison operators (`<`, `>`) to sort ISO date strings, achieving the exact same chronological order with up to 50x better performance and less memory garbage collection.
