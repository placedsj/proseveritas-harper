## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.
## 2026-05-12 - Optimize NavButton re-renders
**Learning:** When using React.memo to optimize list items or menu components, pass derived boolean props (e.g., isActive) rather than raw global state values (e.g., currentView), as passing globally changing state to every component breaks memoization and causes unnecessary re-renders.
**Action:** Pass isActive instead of currentView to memoized components.
