## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-13 - ISO Date String Sorting
**Learning:** In components rendering large datasets like `PatternHeatmap.tsx`, using `new Date().getTime()` inside a sort comparator creates immense garbage collection overhead. ISO date strings sort chronologically when compared lexicographically as strings.
**Action:** Use direct string comparison `a.date < b.date ? -1 : (a.date > b.date ? 1 : 0)` for ISO string arrays instead of instantiating `Date` objects.
