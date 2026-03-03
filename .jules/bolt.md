## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-03-03 - Dashboard Interval Execution
**Learning:** `Dashboard` recalculates countdown dates every 60 seconds inside `setInterval`, doing identical math repeatedly. Also, it only sets the initial `setTimeLeft` after an initial render. By moving fixed math (like `target.getTime()` and `sentencing.getTime()`) outside of the update function, and rendering the update directly rather than re-creating functions, we can slightly optimize.
**Action:** Optimized interval by creating static references to fixed time logic and avoiding closures inside the timer if not needed.
## 2025-03-03 - NavButton Unnecessary Re-renders
**Learning:** `NavButton` is used multiple times in the application and re-rendered unnecessarily when the active route view changes. This impacted performance by re-rendering many non-active components when `App.tsx` state was updated.
**Action:** Wrapped the `NavButton` component with `React.memo` to prevent unnecessary re-renders.
