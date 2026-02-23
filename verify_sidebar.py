
import asyncio
import re
from playwright.async_api import async_playwright, expect

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to the app
        print("Navigating to app...")
        try:
            await page.goto("http://localhost:3000", timeout=60000)
        except Exception as e:
            print(f"Failed to load page: {e}")
            await browser.close()
            return

        # Wait for the sidebar to be visible
        print("Waiting for sidebar...")
        await page.wait_for_selector("nav.w-24")

        # Verify 'Cmd' (Dashboard) is active initially
        cmd_btn = page.get_by_role("button", name="Cmd")
        await expect(cmd_btn).to_be_visible()
        # Check for active class (bg-red-600)
        await expect(cmd_btn).to_have_class(re.compile(r"bg-red-600"))
        print("Cmd button is active.")

        # Click 'Archive' button
        print("Clicking Archive button...")
        archive_btn = page.get_by_role("button", name="Archive")
        # Ensure it's not active before click
        await expect(archive_btn).not_to_have_class(re.compile(r"bg-red-600"))

        await archive_btn.click()

        # Verify 'Archive' is now active
        await expect(archive_btn).to_have_class(re.compile(r"bg-red-600"))
        print("Archive button is active.")

        # Verify 'Cmd' is no longer active
        await expect(cmd_btn).not_to_have_class(re.compile(r"bg-red-600"))
        print("Cmd button is inactive.")

        # Take screenshot
        print("Taking screenshot...")
        await page.screenshot(path="verification_sidebar.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
