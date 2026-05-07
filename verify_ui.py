import time
from playwright.sync_api import sync_playwright

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto('http://localhost:4173')

        # Wait for dashboard to load
        page.wait_for_selector('text=Custody Hearing')

        # Click the Archive tab
        archive_btn = page.locator('button[title="Archive"], button:has-text("Archive")').first
        if archive_btn.count() > 0:
            archive_btn.click()
            time.sleep(1)

        page.screenshot(path='/app/ux_verification.png')
        browser.close()

if __name__ == '__main__':
    verify()
