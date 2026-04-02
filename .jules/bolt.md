## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.
## 2024-05-24 - Single-pass Array Calculations with useMemo
**Learning:** Chained array methods like `.filter().reduce()` create temporary arrays that get garbage collected. When placed directly in the render body without memoization, they recalculate on every keystroke of controlled inputs (like `newTask`), causing unnecessary CPU overhead.
**Action:** Combine chained array iterations into a single `.reduce()` pass and wrap derived state calculations in `useMemo` to cache the result between unrelated state updates.
