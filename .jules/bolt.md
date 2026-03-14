## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-03-14 - Sorting performance with ISO date strings
**Learning:** `new Date()` allocation within array sorts in tight rendering paths (like `PatternHeatmap.tsx`) causes significant unnecessary object overhead. For properly formatted ISO date strings (`YYYY-MM-DDTHH:mm:ss`), strings can be compared directly.
**Action:** Replaced `new Date(a.date).getTime() - new Date(b.date).getTime()` with direct string comparison `a.date < b.date ? -1 : a.date > b.date ? 1 : 0`, optimizing O(N log N) allocations down to basic primitive comparisons.
