## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-13 - Stale Props in Custom React.memo Comparator
**Learning:** Using a custom `areEqual` comparator in `React.memo` that deliberately ignores prop updates (e.g., ignoring a changing `currentView` prop if a component's internal active state hasn't changed) is a React anti-pattern. It introduces maintainability hazards and stale data bugs if future code modifications rely on those ignored props. Furthermore, optimizing a small number of simple UI components (like 6 sidebar buttons) is a premature micro-optimization with zero measurable impact.
**Action:** Avoid complex custom memoization logic for small UI elements. Focus on identifying real bottlenecks involving large datasets, such as eliminating `O(N*logN)` Date object allocations during sorting.
