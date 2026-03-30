## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2026-03-30 - Array chaining and un-memoized derived state
**Learning:** `BusinessSurvival` combined `.filter().reduce()` to calculate a derived total from a state array and evaluated it on every render, including keystrokes for controlled inputs.
**Action:** Optimize chained calculations into single-pass `.reduce()` to avoid intermediate array allocations, and wrap in `useMemo` to prevent recalculation when unrelated state changes.
