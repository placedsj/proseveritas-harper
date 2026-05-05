## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-05-05 - NavButton React.memo
**Learning:** Navigation menus with many identical components (like NavButton) rendered with stable functions (like state setters) can benefit significantly from React.memo. Otherwise, all menu items re-render on every single route change.
**Action:** Use React.memo for pure navigational button components to isolate re-renders to only the buttons whose active state is changing.

## 2025-05-05 - React.memo Pitfall
**Learning:** React.memo alone is insufficient if the props passed to the component change on every update. Passing a string like currentView guarantees the props change for every button on navigation. To actually optimize, pass a derived boolean isActive instead.
**Action:** When using React.memo for lists, calculate derived boolean states in the parent instead of passing down raw values that change for every item.
