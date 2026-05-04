## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-05-04 - Fast String Sorting for ISO Dates
**Learning:** Parsing Date objects simply to compare them chronologically in sort loops is slow and wastes memory. Since ISO 8601 strings and YYYY-MM-DD date strings sort alphabetically in the same order as chronologically, we can skip Date parsing entirely.
**Action:** Replaced new Date(a).getTime() - new Date(b).getTime() with a < b ? -1 : (a > b ? 1 : 0) string comparison when sorting arrays with ISO date strings.
