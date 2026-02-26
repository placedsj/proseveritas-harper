import os
import time
from playwright.sync_api import sync_playwright

def verify_dashboard():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # 1. Navigate to the app to initialize localStorage
        print("Navigating to app...")
        try:
            page.goto("http://localhost:3000/")
        except Exception as e:
            print(f"Failed to navigate: {e}")
            return

        # 2. Inject LocalStorage Data
        print("Injecting localStorage data...")
        evidence_data = '[{"id": "1", "file": "test1.pdf", "verified": true}, {"id": "2", "file": "test2.pdf", "verified": true}]'
        scott_logs = '[{"id": "1", "category": "Denial of Parenting Time", "theSay": "no", "theFact": "yes", "incidentDate": "2024-01-01"}]'
        audit_logs = '[{"id": "1"}, {"id": "2"}, {"id": "3"}]'
        medical_records = '[{"id": "1", "pageCount": 10}, {"id": "2", "pageCount": 5}]'

        page.evaluate(f"""() => {{
            localStorage.setItem('evidence', '{evidence_data}');
            localStorage.setItem('scottLogs', '{scott_logs}');
            localStorage.setItem('systemAuditLogs', '{audit_logs}');
            localStorage.setItem('medicalRecords', '{medical_records}');
        }}""")

        print("Reloading page...")
        page.reload()

        print("Waiting for stats to update...")
        try:
            # Verified Exhibits: 2
            # Use xpath to find the <p> containing the text, then find the sibling <p> (which is the value, actually previous sibling)
            # Structure: <div> <p>{value}</p> <p>Label</p> </div>

            # Find the label
            label = page.get_by_text("Verified Exhibits", exact=True)
            # The value is the previous sibling
            value = label.locator("xpath=preceding-sibling::p")

            value.wait_for(timeout=5000)
            if value.inner_text() == "2":
                print("Verified Exhibits updated to 2!")
            else:
                print(f"Verified Exhibits mismatch: {value.inner_text()}")

            # Days Denied: 1
            label_dd = page.get_by_text("Days Denied", exact=True)
            value_dd = label_dd.locator("xpath=preceding-sibling::p")
            value_dd.wait_for(timeout=5000)
            if value_dd.inner_text() == "1":
                print("Days Denied updated to 1!")
            else:
                print(f"Days Denied mismatch: {value_dd.inner_text()}")

            # Audit Targets: 3
            label_at = page.get_by_text("Audit Targets", exact=True)
            value_at = label_at.locator("xpath=preceding-sibling::p")
            value_at.wait_for(timeout=5000)
            if value_at.inner_text() == "3":
                print("Audit Targets updated to 3!")
            else:
                print(f"Audit Targets mismatch: {value_at.inner_text()}")

            # SJRH Pages: 15
            label_sp = page.get_by_text("SJRH Pages", exact=True)
            value_sp = label_sp.locator("xpath=preceding-sibling::p")
            value_sp.wait_for(timeout=5000)
            if value_sp.inner_text() == "15":
                print("SJRH Pages updated to 15!")
            else:
                print(f"SJRH Pages mismatch: {value_sp.inner_text()}")

        except Exception as e:
            print(f"Stats check failed: {e}")

        os.makedirs("verification", exist_ok=True)
        screenshot_path = "verification/dashboard_stats.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    verify_dashboard()
