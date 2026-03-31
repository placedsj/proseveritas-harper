## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-03-31 - Derived State Recalculation Overhead
**Learning:** Chained array operations (`.filter().reduce()`) that are not memoized cause unnecessary intermediate array creation and redundant iteration on every component re-render, especially those triggered by controlled input changes.
**Action:** Combine chained operations into a single-pass `.reduce()` and wrap derived values in `useMemo` to eliminate intermediate arrays and prevent recalculation unless the dependencies change.
