## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-12 - ISO Date Sorting Optimization
**Learning:** Parsing Date objects (e.g. new Date().getTime()) inside .sort() callbacks for ISO 8601 strings creates immense, unnecessary object allocation and garbage collection overhead, heavily slowing down sorting of large lists.
**Action:** Since ISO 8601 strings are strictly chronological, always use direct string comparison operators (<, >) to sort them instead.
