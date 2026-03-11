#!/bin/bash

# Script to close open pull requests in proseveritas-harper repository
# Usage: ./close_prs.sh

REPO="placedsj/proseveritas-harper"

# Array of PR numbers to close
PRS=(43 42 40 29 28 27 26 25 24 23 22 21 20 19 18 17)

echo "This script will close the following PRs in $REPO:"
echo "${PRS[@]}"
echo ""
read -p "Are you sure you want to continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "Aborted."
    exit 0
fi

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "Error: GitHub CLI (gh) is not installed."
    echo "Please install it from: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "Error: Not authenticated with GitHub CLI."
    echo "Please run: gh auth login"
    exit 1
fi

echo ""
echo "Closing pull requests..."

for PR in "${PRS[@]}"; do
    echo "Closing PR #$PR..."
    if gh pr close "$PR" --repo "$REPO" --comment "Closing as requested."; then
        echo "✓ Successfully closed PR #$PR"
    else
        echo "✗ Failed to close PR #$PR"
    fi
    echo ""
done

echo "Done!"
