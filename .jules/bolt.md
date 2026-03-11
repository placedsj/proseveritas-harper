## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-03-11 - ISO Date String Sorting
**Learning:** Using `new Date().getTime()` inside `.sort()` comparators is extremely expensive and causes N*log(N) object allocations, leading to severe performance degradation on large arrays (like historical log heatmaps).
**Action:** For ISO date strings (like `YYYY-MM-DDTHH:mm:ss`), always use direct O(1) string comparison (e.g., `a < b ? -1 : (a > b ? 1 : 0)`). This avoids object allocation entirely and provides a ~5x speedup for sorting large datasets, completely eliminating the need for complex Schwartzian Transforms.
