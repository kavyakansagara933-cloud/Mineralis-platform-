import sys
from pathlib import Path

# Add backend directory to sys.path
backend_path = Path(r"C:\Users\Kavya Kansagara\Documents\Codex\2026-09-09\referenced-chatgpt-conversation-this-is-an\outputs\mining-intelligence-platform\backend")
sys.path.insert(0, str(backend_path))

import io
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_all_endpoints():
    print("--- 1. Testing Health ---")
    res = client.get("/api/health")
    print("Health response:", res.status_code, res.json())
    assert res.status_code == 200

    print("\n--- 2. Testing Dashboard ---")
    res = client.get("/api/dashboard")
    print("Dashboard response status:", res.status_code)
    data = res.json()
    print("KPIs:", [k["label"] + ": " + k["value"] for k in data["kpis"]])
    print("Alerts count:", len(data["alerts"]))
    assert res.status_code == 200
    assert len(data["kpis"]) >= 4

    print("\n--- 3. Testing Documents List ---")
    res = client.get("/api/documents")
    print("Documents count:", res.json()["total"])
    assert res.status_code == 200
    doc_id = res.json()["items"][0]["id"]

    print("\n--- 4. Testing Document Details ---")
    res = client.get(f"/api/documents/{doc_id}")
    print("Document name:", res.json()["name"])
    print("Extracted metrics count:", len(res.json()["extracted_metrics"]))
    print("Evidence count:", len(res.json()["evidence"]))
    assert res.status_code == 200

    print("\n--- 5. Testing Assistant Q&A with Calculations & Citations ---")
    res = client.post("/api/assistant/ask", json={"question": "Which mine missed its production target?"})
    print("Assistant answer:", res.json()["answer"])
    print("Calculations:", res.json()["calculations"])
    print("Evidence citations:", [e["snippet"] for e in res.json()["evidence"]])
    assert res.status_code == 200
    assert res.json()["verified"] is True
    assert len(res.json()["calculations"]) > 0

    print("\n--- 6. Testing Verified Report Generation & PDF/DOCX Export ---")
    res = client.post("/api/reports/generate", json={
        "report_type": "monthly_production",
        "period": "March 2025",
        "organization": "Coal India Limited"
    })
    print("Report generated:", res.status_code, res.json()["title"])
    print("PDF URL:", res.json()["pdf_url"])
    print("DOCX URL:", res.json()["docx_url"])
    assert res.status_code == 200

    # Test downloading the generated PDF
    pdf_url = res.json()["pdf_url"]
    pdf_res = client.get(pdf_url)
    print("PDF download status:", pdf_res.status_code, "Content-Length:", len(pdf_res.content))
    assert pdf_res.status_code == 200
    assert len(pdf_res.content) > 1000

    print("\n--- 7. Testing Analytics ---")
    res = client.get("/api/analytics")
    print("Analytics status:", res.status_code, "Grades count:", len(res.json()["grade_distribution"]))
    assert res.status_code == 200

    print("\n--- 8. Testing Topics Word Cloud ---")
    res = client.get("/api/topics")
    print("Topics word cloud items:", len(res.json()["word_cloud"]))
    assert res.status_code == 200

    print("\n--- 9. Testing Alerts ---")
    res = client.get("/api/alerts")
    print("Alerts count:", len(res.json()))
    assert res.status_code == 200

    print("\n--- 10. Testing Document Upload Pipeline ---")
    test_csv = (
        "Mine Name,Target (MT),Actual (MT),Dispatch (MT)\n"
        "Amrapali OCP,15.0,16.2,15.8\n"
        "Ashok OCP,12.0,10.8,11.0\n"
    )
    files = {"file": ("CCL_North_Karanpura_Prod.csv", io.BytesIO(test_csv.encode("utf-8")), "text/csv")}
    res = client.post("/api/documents/upload", files=files)
    print("Upload status:", res.status_code, res.json())
    assert res.status_code == 202
    new_doc_id = res.json()["id"]

    # Verify new document is indexed in DB and reachable
    res = client.get(f"/api/documents/{new_doc_id}")
    print("New uploaded document metrics:", len(res.json()["extracted_metrics"]))
    assert res.status_code == 200
    assert len(res.json()["extracted_metrics"]) >= 2

    print("\n==========================================")
    print(">>> ALL 10 TEST SUITES PASSED FLAWLESSLY! <<<")
    print("==========================================")

if __name__ == "__main__":
    test_all_endpoints()
