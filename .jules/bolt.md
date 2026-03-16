## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-05-20 - Lexicographical Date String Sorting
**Learning:** `PatternHeatmap` component was sorting logs using `new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()`. This instantiated new Date objects for every comparison on potentially large arrays of abuse logs.
**Action:** Replaced `new Date().getTime()` instantiations with direct lexicographical string comparison (`a < b ? -1 : 1`) since the timestamps are consistent ISO string formats (`YYYY-MM-DDTHH:mm`). This reduces memory allocation overhead and significantly improves sort performance.
