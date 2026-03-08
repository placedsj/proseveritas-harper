## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-03-08 - O(N log N) Date Instantiation in Sorts
**Learning:** Using `new Date(string).getTime()` inside an array `.sort()` comparator creates massive object allocation overhead, as it instantiates a new Date object for every comparison (O(N log N) times). This was observed in `PatternHeatmap.tsx`, `CustodyMath.tsx`, and `CourtTimeline.tsx`.
**Action:** Since date strings in the application are already in standard, strictly lexicographically sortable formats (like ISO 8601 strings e.g. `YYYY-MM-DDTHH:mm:ss`), always use direct string comparison (e.g., `a.date < b.date ? -1 : (a.date > b.date ? 1 : 0)`) rather than instantiating Date objects for sorting.
