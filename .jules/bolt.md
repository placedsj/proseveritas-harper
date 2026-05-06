## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2024-05-18 - React.memo on globally updated nav items
**Learning:** When navigating between views in a global App state that passes the currentView to every single navigation item in a sidebar, ALL navigation items will re-render whenever the view changes. In this app, changing view re-renders 16 NavButtons on every click.
**Action:** By wrapping NavButton in React.memo and passing a simple primitive boolean prop (isActive = {view === target}) instead of passing down currentView (which changes globally and defeats memoization since its value is different every time), we can prevent unnecessary re-renders of inactive navigation items when navigating.
