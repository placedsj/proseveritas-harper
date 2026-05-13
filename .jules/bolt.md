## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-13 - NavButton Re-renders
**Learning:** Passing global state (`currentView` string) to multiple instances of a list/menu component (`NavButton`) defeats memoization because the global state changes on every interaction, causing O(n) re-renders across all items.
**Action:** When rendering lists or menus with active states, pass derived booleans (e.g., `isActive={view === target}`) rather than raw global state. Combined with `React.memo`, this restricts re-rendering to only the items whose state actually flipped.
