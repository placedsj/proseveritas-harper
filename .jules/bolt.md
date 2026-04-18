## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-04-18 - ISO Date String Sorting Overhead
**Learning:** Constructing Date objects just to get timestamps for sorting arrays of ISO date strings creates massive object allocation overhead and slows sorting significantly.
**Action:** Use standard string comparison operators (e.g., a < b ? -1 : 1) on ISO date strings, which yields the exact same chronological sorting ~20x faster without allocating objects.
