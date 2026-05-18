## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2026-05-18 - Optimize React Component Rendering by Avoiding Global State
**Learning:** Passing a global state variable (like \`currentView\`) down to every child component in a list (e.g., a list of \`NavButton\` items) defeats memoization. When the global state changes, the prop passed to every child changes, causing all items to re-render, even those whose derived state (like \`isActive\`) hasn't actually changed.
**Action:** When wrapping list items or menu components with \`React.memo\`, pass derived boolean props (e.g., \`isActive = {view === 'dashboard'}\`) instead of raw global state. This limits re-renders strictly to the items whose derived state has transitioned.

## 2026-05-18 - Optimize React Component Rendering by Avoiding Global State
**Learning:** Passing a global state variable (like `currentView`) down to every child component in a list (e.g., a list of `NavButton` items) defeats memoization. When the global state changes, the prop passed to every child changes, causing all items to re-render, even those whose derived state (like `isActive`) hasn't actually changed.
**Action:** When wrapping list items or menu components with `React.memo`, pass derived boolean props (e.g., `isActive = {view === 'dashboard'}`) instead of raw global state. This limits re-renders strictly to the items whose derived state has transitioned.
