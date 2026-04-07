## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2024-04-07 - ISO Date String Sorting Optimization
**Learning:** Parsing ISO date strings using `new Date()` inside `.sort()` callbacks creates significant object allocation overhead which can severely impact performance for large arrays.
**Action:** Use standard string comparison operators (e.g., `a < b ? -1 : (a > b ? 1 : 0)`) directly on ISO date strings for chronological sorting, as they are lexically sortable, avoiding the cost of object instantiation.
