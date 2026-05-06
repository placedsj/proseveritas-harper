## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.
## 2025-02-12 - Date Sorting Optimization
**Learning:** Parsing ISO date strings to full JavaScript Date objects inside array sort() callbacks is highly inefficient. Since ISO 8601 strings sort correctly alphabetically, converting them causes unnecessary object allocation and garbage collection overhead.
**Action:** Replaced new Date().getTime() comparisons with direct string comparison operators when sorting by date. Applied this optimization across CustodyMath.tsx, PatternHeatmap.tsx, and CourtTimeline.tsx.
