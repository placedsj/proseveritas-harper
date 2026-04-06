## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-12 - PatternHeatmap Array & Loop Optimizations
**Learning:** Inside `PatternHeatmap`, generating `Date` objects inside a `.sort()` comparator adds massive object allocation overhead on large arrays compared to simple string comparison on ISO dates. Additionally, standard `for` loops outperform `.reduce()` for simple aggregations by avoiding callback allocation. Moving static objects outside components stops them from being recreated on every render.
**Action:** Used standard string comparison `a < b ? -1 : (a > b ? 1 : 0)` for ISO string sorting and replaced `reduce` with a standard `for` loop for performance-critical path rendering. Also shifted static lookup objects (`if/else` and `switch` statements) outside the render cycle for O(1) lookups.
