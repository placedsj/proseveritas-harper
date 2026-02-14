# Pull Request Closure Guide

This document provides information about the open pull requests in this repository and instructions for closing them.

## Open Pull Requests (as of 2026-02-14)

The following 16 pull requests are currently open:

1. **PR #43**: [WIP] Close existing pull requests
2. **PR #42**: [WIP] Close existing pull requests
3. **PR #40**: Fix duplicate declarations and JSX structure errors breaking build
4. **PR #29**: 🛡️ Sentinel: [HIGH] Fix XSS in GlobalSearch
5. **PR #28**: Palette: Enhance Dashboard Accessibility with Semantic Buttons
6. **PR #27**: ⚡ Bolt: Implement code splitting for route components
7. **PR #26**: ⚡ Bolt: Implement Code Splitting for Route Components
8. **PR #25**: Implement Code Splitting, Add Tests, and Integrate DailyRitual/AbuseLog
9. **PR #24**: ⚡ Bolt: Implement lazy loading for route components
10. **PR #23**: Improve Navigation Accessibility
11. **PR #22**: ⚡ Bolt: Debounce StrategyRoom localStorage writes
12. **PR #21**: 🛡️ Sentinel: Add Content Security Policy to index.html
13. **PR #20**: feat: Implement real file upload for AbuseLog using IndexedDB
14. **PR #19**: ⚡ Optimize Roadmap component rendering
15. **PR #18**: ⚡ Optimize DailyRitual rendering performance
16. **PR #17**: ⚡ Debounced LocalStorage writes in StrategyRoom

## How to Close Pull Requests

### Option 1: Using GitHub CLI (gh)

If you have GitHub CLI installed, you can close PRs using:

```bash
# Close a single PR
gh pr close 43 --repo placedsj/proseveritas-harper

# Close multiple PRs at once
gh pr close 43 42 40 29 28 27 26 25 24 23 22 21 20 19 18 17 --repo placedsj/proseveritas-harper
```

### Option 2: Using the close_prs.sh Script

Run the provided script:

```bash
chmod +x close_prs.sh
./close_prs.sh
```

### Option 3: Via GitHub Web Interface

1. Navigate to each PR URL:
   - https://github.com/placedsj/proseveritas-harper/pull/[NUMBER]
2. Click the "Close pull request" button at the bottom of the page
3. Optionally add a comment explaining why it's being closed

## Recommendations

### Duplicate PRs (Consider Closing)
- **PR #42 and #43**: Both are "[WIP] Close existing pull requests" - these appear to be duplicates attempting the same task

### Similar PRs (May Need Consolidation)
- **PR #26 and #27**: Both implement code splitting for route components
- **PR #17 and #22**: Both about debouncing localStorage writes in StrategyRoom

### Review Before Closing
Before closing the following PRs, you may want to review if any changes should be preserved:
- **PR #40**: Fix duplicate declarations and JSX structure errors breaking build
- **PR #29**: Security fix for XSS in GlobalSearch
- **PR #28**: Accessibility enhancements
- **PR #21**: Security - Content Security Policy

## Notes

- Some PRs may contain important fixes or features that should be merged rather than closed
- Consider reviewing each PR individually to determine if it should be merged, closed, or needs further work
- PRs marked with 🛡️ Sentinel contain security fixes and should be carefully reviewed
- PRs marked with ⚡ Bolt contain performance optimizations
