import re
from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        try:
            # Navigate to the dashboard
            page.goto("http://localhost:3001")

            # Wait for the sidebar to be visible
            # Assuming 'nav' is a good selector for the sidebar based on App.tsx structure
            page.wait_for_selector("nav")

            # Locate the "Cmd" (Dashboard) button in the sidebar
            # Note: The text might be uppercase due to CSS, but the DOM content is likely "Cmd"
            # Using get_by_role("button") with name filter is robust
            cmd_button = page.get_by_role("button", name="Cmd")

            # Verify it has the active class (bg-red-600)
            # The NavButton uses 'bg-red-600' for active state
            expect(cmd_button).to_have_class(re.compile(r"bg-red-600"))

            # Locate another button, e.g., "Archive" which should NOT be active
            archive_button = page.get_by_role("button", name="Archive")
            expect(archive_button).not_to_have_class(re.compile(r"bg-red-600"))

            # Take a screenshot of the initial state
            page.screenshot(path="sidebar_verification.png")
            print("Screenshot saved to sidebar_verification.png")

            # Click Archive and verify active state changes
            archive_button.click()

            # Verify Archive is now active
            expect(archive_button).to_have_class(re.compile(r"bg-red-600"))
            # Verify Cmd is now inactive
            expect(cmd_button).not_to_have_class(re.compile(r"bg-red-600"))

            page.screenshot(path="sidebar_verification_switched.png")
            print("Screenshot saved to sidebar_verification_switched.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
