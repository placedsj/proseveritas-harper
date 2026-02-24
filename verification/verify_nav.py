import re
from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 1280, 'height': 720})

        # Navigate to the app
        page.goto("http://localhost:3000")

        # Wait for dashboard to load
        page.wait_for_selector("text=Status: Pro Se Command", timeout=10000)

        # Select the sidebar nav
        # The NavButton for Dashboard has label "Cmd"
        # We need to find the button inside the nav that contains "Cmd"
        # The sidebar is hidden on md, so we set viewport to 1280 (desktop)

        # Select Dashboard button
        # The buttons are flex columns with an icon and a span
        dashboard_btn = page.locator("nav.w-24 button", has_text="Cmd")

        # Verify initial active state (bg-red-600)
        expect(dashboard_btn).to_have_class(re.compile(r"bg-red-600"))

        # Select Scott Schedule button ("Scott")
        scott_btn = page.locator("nav.w-24 button", has_text="Scott")

        # Verify Scott button is initially inactive (text-slate-400)
        expect(scott_btn).to_have_class(re.compile(r"text-slate-400"))

        # Click Scott button
        scott_btn.click()

        # Wait for Scott Schedule header
        page.wait_for_selector("text=Scott Schedule", timeout=10000)

        # Verify active state changes
        # Dashboard should now be inactive
        expect(dashboard_btn).to_have_class(re.compile(r"text-slate-400"))

        # Scott should now be active
        expect(scott_btn).to_have_class(re.compile(r"bg-red-600"))

        # Take screenshot
        page.screenshot(path="verification/nav_verification.png")
        print("Verification successful!")

        browser.close()

if __name__ == "__main__":
    run()
