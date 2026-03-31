## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2024-04-01 - Optimize Chained Array Operations in React
**Learning:** Chained `.filter().reduce()` operations create intermediate arrays and iterate multiple times. In React components with frequent state updates, this can cause unnecessary GC pressure and CPU overhead, especially when not memoized.
**Action:** Always combine `.filter().reduce()` into a single-pass `.reduce()` where possible, and wrap the derived value in `useMemo` to prevent recalculation on unrelated re-renders.
