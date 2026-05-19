## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2026-05-19 - Memoize Menu Item Render Cycles
**Learning:** Passing a rapidly changing global state like currentView to every single navigation button item causes all 16 buttons to needlessly re-render on every single tab change, creating completely avoidable overhead on menu interaction.
**Action:** Replaced the global state prop currentView with a derived boolean isActive and wrapped the component in React.memo to skip rendering for the 14 off-screen buttons when switching between tabs.
