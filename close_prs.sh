#!/bin/bash

# Script to help close open pull requests in proseveritas-harper repository
# This script requires GitHub CLI (gh) to be installed and authenticated

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Repository details
REPO="placedsj/proseveritas-harper"

# List of PRs to close (excluding the current one #43)
PRS_TO_CLOSE=(42 40 29 28 27 26 25 24 23 22 21 20 19 18 17)

# Default closure message
DEFAULT_MESSAGE="Closing stale PR to clean up repository. If this work is still needed, please reopen with updated changes."

# Function to print colored output
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if gh CLI is installed
check_gh_cli() {
    if ! command -v gh &> /dev/null; then
        print_error "GitHub CLI (gh) is not installed"
        echo "Please install it from: https://cli.github.com/"
        exit 1
    fi
    print_info "GitHub CLI found"
}

# Function to check if user is authenticated
check_auth() {
    if ! gh auth status &> /dev/null; then
        print_error "Not authenticated with GitHub CLI"
        echo "Please run: gh auth login"
        exit 1
    fi
    print_info "GitHub CLI authenticated"
}

# Function to display PR info
show_pr_info() {
    local pr_number=$1
    print_info "PR #$pr_number details:"
    gh pr view $pr_number --repo $REPO --json number,title,state,author,createdAt | jq -r '"  Title: \(.title)\n  Author: \(.author.login)\n  Created: \(.createdAt)\n  State: \(.state)"'
}

# Function to close a single PR
close_pr() {
    local pr_number=$1
    local message=${2:-$DEFAULT_MESSAGE}
    
    print_info "Closing PR #$pr_number..."
    
    if [ "$DRY_RUN" = true ]; then
        echo "  [DRY RUN] Would execute: gh pr close $pr_number --repo $REPO --comment \"$message\""
    else
        if gh pr close $pr_number --repo $REPO --comment "$message"; then
            print_info "Successfully closed PR #$pr_number"
        else
            print_error "Failed to close PR #$pr_number"
            return 1
        fi
    fi
}

# Function to close all PRs
close_all_prs() {
    print_info "Starting to close ${#PRS_TO_CLOSE[@]} pull requests..."
    echo ""
    
    local success_count=0
    local fail_count=0
    
    for pr in "${PRS_TO_CLOSE[@]}"; do
        echo ""
        print_info "Processing PR #$pr"
        show_pr_info $pr
        echo ""
        
        if close_pr $pr "$DEFAULT_MESSAGE"; then
            ((success_count++))
        else
            ((fail_count++))
        fi
        
        # Add a small delay to avoid rate limiting
        sleep 1
    done
    
    echo ""
    print_info "Summary:"
    echo "  Successfully closed: $success_count"
    if [ $fail_count -gt 0 ]; then
        echo "  Failed to close: $fail_count"
    fi
}

# Function to display help
show_help() {
    cat << EOF
Usage: $0 [OPTIONS]

Close open pull requests in the proseveritas-harper repository.

OPTIONS:
    --dry-run           Show what would be done without actually closing PRs
    --pr NUMBER         Close a specific PR by number
    --message "TEXT"    Custom closure message (default: standard message)
    --list              List all PRs that would be closed
    --help              Show this help message

EXAMPLES:
    $0 --dry-run                           # Preview what would be closed
    $0                                      # Close all PRs with default message
    $0 --pr 42                              # Close only PR #42
    $0 --pr 42 --message "Duplicate PR"    # Close PR #42 with custom message
    $0 --list                              # List PRs to be closed

PREREQUISITES:
    - GitHub CLI (gh) must be installed
    - Must be authenticated with GitHub (gh auth login)
    - Must have write access to the repository

EOF
}

# Function to list PRs
list_prs() {
    print_info "Pull requests that would be closed:"
    echo ""
    for pr in "${PRS_TO_CLOSE[@]}"; do
        show_pr_info $pr
        echo ""
    done
}

# Main script
main() {
    DRY_RUN=false
    SPECIFIC_PR=""
    CUSTOM_MESSAGE=""
    
    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --dry-run)
                DRY_RUN=true
                shift
                ;;
            --pr)
                SPECIFIC_PR="$2"
                shift 2
                ;;
            --message)
                CUSTOM_MESSAGE="$2"
                shift 2
                ;;
            --list)
                check_gh_cli
                check_auth
                list_prs
                exit 0
                ;;
            --help)
                show_help
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                show_help
                exit 1
                ;;
        esac
    done
    
    # Set message if custom one provided
    if [ -n "$CUSTOM_MESSAGE" ]; then
        DEFAULT_MESSAGE="$CUSTOM_MESSAGE"
    fi
    
    # Show dry run notice
    if [ "$DRY_RUN" = true ]; then
        print_warning "DRY RUN MODE - No PRs will actually be closed"
        echo ""
    fi
    
    # Check prerequisites
    check_gh_cli
    check_auth
    
    # Execute based on options
    if [ -n "$SPECIFIC_PR" ]; then
        print_info "Closing specific PR #$SPECIFIC_PR"
        show_pr_info $SPECIFIC_PR
        close_pr $SPECIFIC_PR "$DEFAULT_MESSAGE"
    else
        close_all_prs
    fi
    
    echo ""
    if [ "$DRY_RUN" = true ]; then
        print_info "Dry run complete. Use without --dry-run to actually close PRs."
    else
        print_info "PR closure process complete!"
        print_info "Note: PR #43 (current PR) should be closed manually after reviewing this work."
    fi
}

# Run main function
main "$@"
