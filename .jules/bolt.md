## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.
## 2024-04-04 - Object Allocation in Date Sorts
**Learning:** A previous PR to optimize `.filter().reduce()` was rejected as an unmeasurable micro-optimization. Profiling the codebase's heavy reliance on sorting ISO date strings revealed that `new Date(str).getTime()` inside sort comparators causes massive object allocation and GC pauses. Direct lexicographical string comparison is ~10x faster.
**Action:** When sorting ISO date strings (a common pattern across app timelines and logs), use `localeCompare` instead of instantiating Date objects to avoid main thread blocking.
