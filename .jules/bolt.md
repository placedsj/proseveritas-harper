## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2026-05-21 - [React.memo and Global State Propagation]
**Learning:** Passing a rapidly changing global state (like `currentView`) down to a list of components (like `NavButton`) breaks memoization because the prop changes for *every* component whenever the state updates, even if their specific active state hasn't changed.
**Action:** When memoizing list items or navigation buttons, compute derived boolean props (e.g., `isActive={view === target}`) at the parent level instead of passing the raw global state, ensuring that only components whose derived prop actually changes will re-render.
