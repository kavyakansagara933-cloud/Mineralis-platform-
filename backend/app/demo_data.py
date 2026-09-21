from __future__ import annotations

DOCUMENTS = [
    {
        "id": "doc-march-2025",
        "name": "Synthetic_March_2025_Production_Report.pdf",
        "file_type": "PDF",
        "mine": "Mine B",
        "subsidiary": "Demo Coal Subsidiary",
        "period": "March 2025",
        "status": "ready",
        "confidence": 96,
        "source_kind": "synthetic_demo",
        "uploaded_at": "2026-09-09T10:00:00Z",
    },
    {
        "id": "doc-fy-2024-25",
        "name": "Synthetic_FY_2024_25_Mine_Performance.xlsx",
        "file_type": "XLSX",
        "mine": "Mine A",
        "subsidiary": "Demo Coal Subsidiary",
        "period": "FY 2024-25",
        "status": "review_needed",
        "confidence": 82,
        "source_kind": "synthetic_demo",
        "uploaded_at": "2026-09-09T10:05:00Z",
    },
]

EVIDENCE = {
    "ev-production-b": {
        "id": "ev-production-b",
        "document_id": "doc-march-2025",
        "document_name": "Synthetic_March_2025_Production_Report.pdf",
        "page_number": 12,
        "table_reference": "Table 4 — Production Performance",
        "snippet": "Mine B achieved 8.7 MT against a monthly target of 9.4 MT.",
        "confidence": 96,
    },
    "ev-target-b": {
        "id": "ev-target-b",
        "document_id": "doc-march-2025",
        "document_name": "Synthetic_March_2025_Production_Report.pdf",
        "page_number": 12,
        "table_reference": "Table 4 — Production Performance",
        "snippet": "Target production for Mine B was 9.4 MT.",
        "confidence": 96,
    },
    "ev-production-a": {
        "id": "ev-production-a",
        "document_id": "doc-fy-2024-25",
        "document_name": "Synthetic_FY_2024_25_Mine_Performance.xlsx",
        "page_number": 1,
        "table_reference": "Sheet: Performance Summary, Row 4",
        "snippet": "Mine A recorded 12.4 MT against a target of 12.0 MT.",
        "confidence": 94,
    },
}

METRICS = [
    {"mine": "Mine A", "actual": 12.4, "target": 12.0, "unit": "MT", "evidence_id": "ev-production-a"},
    {"mine": "Mine B", "actual": 8.7, "target": 9.4, "unit": "MT", "evidence_id": "ev-production-b"},
    {"mine": "Mine C", "actual": 10.2, "target": 10.1, "unit": "MT", "evidence_id": "ev-production-a"},
]
