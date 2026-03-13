## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-03-13 - ISO String Sorting Optimization
**Learning:** Sorting arrays of objects by an ISO date string (like `YYYY-MM-DDTHH:mm:ss`) using `new Date(date).getTime()` comparisons inside tight loops/memoized logic introduces massive object allocation overhead. In components like `PatternHeatmap.tsx` where logs arrays can grow rapidly, this is a critical performance path bottleneck.
**Action:** When sorting by ISO strings, always use direct string comparison (e.g., `a.date < b.date ? -1 : (a.date > b.date ? 1 : 0)`). This is highly optimized by V8 and completely avoids object instantiation overhead.
