## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2026-03-05 - Pattern Heatmap Sorting Performance
**Learning:** `PatternHeatmap.tsx` used a standard sort that parsed `new Date` inside the `sort` callback for potentially large arrays of abuse logs.
**Action:** Implemented a Schwartzian transform (map-sort-map) to only parse dates once per item. This reduces overhead from O(N log N) `new Date` instantiations to O(N), significantly improving performance for larger datasets.
