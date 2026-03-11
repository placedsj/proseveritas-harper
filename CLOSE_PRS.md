# Guide to Closing Pull Requests

This guide provides instructions for closing the open pull requests in this repository.

## Current Status

As of February 14, 2026, there are 16 open pull requests in this repository:

- PR #43: [WIP] Close existing pull requests
- PR #42: [WIP] Close existing pull requests
- PR #40: Fix duplicate declarations and JSX structure errors breaking build
- PR #29: 🛡️ Sentinel: [HIGH] Fix XSS in GlobalSearch
- PR #28: Palette: Enhance Dashboard Accessibility with Semantic Buttons
- PR #27: ⚡ Bolt: Implement code splitting for route components
- PR #26: ⚡ Bolt: Implement Code Splitting for Route Components
- PR #25: Implement Code Splitting, Add Tests, and Integrate DailyRitual/AbuseLog
- PR #24: ⚡ Bolt: Implement lazy loading for route components
- PR #23: Improve Navigation Accessibility
- PR #22: ⚡ Bolt: Debounce StrategyRoom localStorage writes
- PR #21: 🛡️ Sentinel: Add Content Security Policy to index.html
- PR #20: feat: Implement real file upload for AbuseLog using IndexedDB
- PR #19: ⚡ Optimize Roadmap component rendering
- PR #18: ⚡ Optimize DailyRitual rendering performance
- PR #17: ⚡ Debounced LocalStorage writes in StrategyRoom

## Why These PRs Need to Be Closed

Many of these PRs appear to be:
- Work-in-progress PRs that were never completed
- Duplicate PRs addressing the same issue
- PRs from automated tools (Copilot, Bolt, Sentinel, Palette) that may have conflicts or incomplete implementations

## How to Close Pull Requests

### Option 1: Using GitHub Web Interface (Manual)

1. Navigate to each PR's page on GitHub
2. Review the PR to determine if it should be closed or merged
3. Add a comment explaining why the PR is being closed (e.g., "Closing as stale/duplicate/superseded")
4. Click the "Close pull request" button at the bottom of the page

### Option 2: Using GitHub CLI (Automated)

If you have the GitHub CLI (`gh`) installed and authenticated:

1. Run the provided script:
   ```bash
   bash close_prs.sh
   ```

2. Or run individual commands:
   ```bash
   # Close a specific PR with a comment
   gh pr close 42 --comment "Closing this PR as it's no longer needed"
   
   # Close multiple PRs
   for pr in 42 40 29 28 27 26 25 24 23 22 21 20 19 18 17; do
     gh pr close $pr --comment "Closing stale PR to clean up repository"
   done
   ```

### Option 3: Using the Provided Script

Run the `close_prs.sh` script which will generate commands for you to review and execute:

```bash
bash close_prs.sh --dry-run  # Preview commands without executing
bash close_prs.sh            # Execute the closure commands
```

## Prerequisites for Automated Closure

- Install GitHub CLI: https://cli.github.com/
- Authenticate with GitHub: `gh auth login`
- Have write access to the repository

## Recommendations

Before closing PRs, consider:

1. **Review each PR**: Some may contain valuable work that should be merged or cherry-picked
2. **Check for dependencies**: Some PRs might be blocking or related to others
3. **Preserve useful changes**: If a PR has good code but conflicts, consider rebasing or creating a new PR
4. **Document reasons**: Always add a comment explaining why a PR is being closed

### Specific Recommendations:

- **PRs #42 and #43**: These are meta-PRs about closing PRs themselves - can be closed after cleanup is complete
- **PR #40**: Check if build errors were actually fixed before closing
- **PR #29**: Security fix for XSS - review carefully before closing, may need to be merged or addressed differently
- **Duplicate PRs (#26 and #27, #17 and #22)**: Keep the better implementation, close the duplicate

## After Closing PRs

1. Consider adding branch protection rules to prevent stale PRs
2. Set up automated stale PR detection (GitHub Actions)
3. Establish clear contribution guidelines
4. Consider using PR templates to keep PRs focused and complete
