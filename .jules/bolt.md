## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-04-26 - ISO Date Sorting Optimization
**Learning:** Sorting arrays of objects using new Date(str).getTime() inside the sort callback creates thousands of temporary Date objects, causing significant garbage collection overhead and slowing down sort operations by up to 1000x compared to string comparisons.
**Action:** Use direct string comparison operators (<, >) for ISO 8601 date strings, as their alphabetical order exactly matches their chronological order without requiring parsing.
