## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.
## 2025-04-08 - Date Sorting Allocation Overhead
**Learning:** In React components dealing with large chronological state arrays (like timelines and heatmaps), using `new Date(string).getTime()` in sort callbacks creates `O(N log N)` object allocations, causing unnecessary GC pressure on every render.
**Action:** Always use primitive string comparison (e.g., `a < b ? -1 : (a > b ? 1 : 0)`) for ISO 8601 date strings to avoid object instantiation overhead.
