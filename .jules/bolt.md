## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.
## 2024-05-24 - Optimize Array Sorting by ISO Dates
**Learning:** Sorting arrays of objects by ISO-8601 date strings using `new Date().getTime()` causes significant object allocation overhead in loops, which hurts performance.
**Action:** Use standard string comparison operators (`<` and `>`) for chronological sorting of ISO dates to avoid `Date` instantiation and improve execution speed.
