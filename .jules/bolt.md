## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.
## 2026-05-09 - Memoization Prop Primitives
**Learning:** When using React.memo on list items or navigation buttons, passing a raw global state value (like currentView) breaks memoization because the value changes on every update, causing all items to re-render. Passing derived primitive booleans (like isActive={view === target}) alongside a memoized callback ensures only the actually changed items re-render.
**Action:** Always derive boolean states before passing to memoized child components in lists or navigation menus instead of passing global string/enum state.
