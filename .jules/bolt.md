## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-03-11 - NavButton Active State Optimization
**Learning:** `NavButton` receives the global `currentView` prop, meaning every navigation button in the sidebar re-renders on every route change, even if its own active state hasn't changed. Standard `React.memo` isn't enough because `currentView` changes.
**Action:** Use `React.memo` with a custom `arePropsEqual` function that calculates `wasActive = prevProps.currentView === prevProps.target` and `isActive = nextProps.currentView === nextProps.target`. Comparing `wasActive === isActive` instead of `currentView` prevents inactive buttons from needlessly re-rendering, while explicitly comparing other props (like `target`, `label`, `icon`, `onNavigate`) prevents UI staleness.
