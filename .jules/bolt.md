## 2025-02-18 - React.lazy for Named Exports
**Learning:** `React.lazy` only supports default exports. For named exports, use the pattern `.then(module => ({ default: module.NamedExport }))`.
**Action:** Always check if a component is a default or named export before lazy loading it.
