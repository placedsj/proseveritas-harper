## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-28 - PatternHeatmap performance optimization
**Measurement:** Replaced O(N log N) date allocations and unoptimized heuristic calculations with string comparison operators and static lookup objects.
**Optimization:** Avoided `new Date(a).getTime()` during sorting. Replaced O(N) multi-branch conditionals with O(1) object lookup in `getSeverity`.
