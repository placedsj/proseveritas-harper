## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-23 - Memoizing derived state computations
**Learning:** `totalValue` calculation in `BusinessSurvival.tsx` recalculated on every keystroke (due to controlled input updates) and chained `filter` and `reduce`, which iterated the array twice and created intermediate arrays. This is an anti-pattern for state derivation in React.
**Action:** Use `useMemo` for derived values from arrays to prevent recalculation during unrelated state updates, and combine `.filter().reduce()` into a single-pass `.reduce()` to eliminate intermediate array creation.
