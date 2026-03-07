## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-13 - Schwartzian Transform Referential Equality
**Learning:** When applying the Schwartzian Transform in React state updates, it's CRITICAL to map the original object reference into the wrapper (`{ item, time }`) and map it back out, rather than spreading the object properties (`{ ...item, time }`). Spreading creates brand new object references for the entire array, causing React to potentially trigger expensive full DOM re-renders for every child component, destroying the performance gains of the optimized sort.
**Action:** Always wrap the original object reference `map(e => ({ e, val: calc() }))` and unwrap `map(w => w.e)` instead of using object spread/rest.
