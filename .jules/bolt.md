## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-17 - Sidebar Render Cascade
**Learning:** The `NavButton` component accepted `currentView` as a prop, causing all sidebar items (~16) to re-render whenever the main view changed, even though only two buttons visually update.
**Action:** Changed `NavButton` to accept a boolean `isActive` prop and memoized it, isolating updates to only the relevant buttons.
