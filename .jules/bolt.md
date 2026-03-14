## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-03-09 - [Optimized array sorting with new Date]
**Learning:** For large arrays sorting based on ISO 8601 strings, instantiating `new Date()` within the `sort` comparison function causes massive overhead due to object allocation.
**Action:** Replace `new Date(a.date).getTime() - new Date(b.date).getTime()` with direct lexicographical string comparison `a.date < b.date ? -1 : (a.date > b.date ? 1 : 0)` to achieve O(N log N) object allocation avoidance while maintaining the correct chronological order.
