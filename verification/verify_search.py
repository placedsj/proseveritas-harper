from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        try:
            page.goto("http://localhost:3000", timeout=30000)
        except:
            return

        # Open Search
        try:
            page.get_by_label("Open global search").first.click()
        except:
            page.keyboard.press("Meta+K")

        # Wait for search modal
        try:
            page.wait_for_selector("input[placeholder='Search tasks, evidence, logs...']", state="visible", timeout=5000)
        except:
            return

        # Type "nonexistentterm"
        page.fill("input[placeholder='Search tasks, evidence, logs...']", "nonexistentterm")
        time.sleep(1) # wait for debounce

        page.screenshot(path="verification/search_no_results.png")

        browser.close()

if __name__ == "__main__":
    run()
