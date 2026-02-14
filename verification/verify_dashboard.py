from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:3000")

        # Wait for the dashboard to load (Sidebar logo SDG)
        page.wait_for_selector("text=SDG")

        # Check if dashboard specific content is visible
        # "Status: Pro Se Command"
        page.wait_for_selector("text=Status: Pro Se Command")

        # Click on a nav button, e.g., "Map" (Roadmap)
        # The button has a span with text "MAP" inside.
        # But wait, the button itself is what we click.
        # Let's find the button by text.
        page.click("text=MAP")

        # Wait for Roadmap specific content
        # "Execution Roadmap" is in Roadmap.tsx
        page.wait_for_selector("text=Execution Roadmap")

        # Take a screenshot
        page.screenshot(path="verification/dashboard_nav.png")

        browser.close()

if __name__ == "__main__":
    run()
