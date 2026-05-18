## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2026-05-18 - React.memo with Global State Props
**Learning:** Passing a globally changing state (like `currentView`) to all `NavButton` components breaks `React.memo` and causes unnecessary re-renders of the entire sidebar on every navigation change.
**Action:** Pass derived primitive boolean props (like `isActive`) instead of raw global state values to memoized child components.
