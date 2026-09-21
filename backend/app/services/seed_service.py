from __future__ import annotations

from sqlalchemy.orm import Session
from ..models.db_models import Document, DocumentPage, ExtractedMetric, DocumentChunk, EvidenceCitation, Report, Alert
from .calculator_service import CalculatorService
from .rag_service import RAGRetrieverService

def seed_initial_mining_data(db: Session):
    # Check if database already has seeded documents
    if db.query(Document).count() > 0:
        return

    # -------------------------------------------------------------
    # Document 1: Ministry of Coal Monthly Production Statement
    # -------------------------------------------------------------
    doc1 = Document(
        id="doc-monthly-2025-03",
        name="Ministry_of_Coal_Monthly_Production_Mar2025.pdf",
        file_type="pdf",
        file_path="sample-data/Ministry_of_Coal_Monthly_Production_Mar2025.pdf",
        file_size_bytes=1048576,
        confidence_score=98,
        total_pages=3,
        subsidiary="ECL & BCCL",
        period="Mar 2025",
        source_provenance="Ministry of Coal Official Monthly Statistical Release",
        status="ready"
    )
    db.add(doc1)

    p1_text = """MINISTRY OF COAL - GOVERNMENT OF INDIA
MONTHLY PRODUCTION & DISPATCH HIGHLIGHTS - MARCH 2025
Table 1: Subsidiary-Wise & Mine-Wise Coal Production Summary
Mine A (ECL OpenCast): Target: 10.0 MT | Actual: 11.2 MT | Achievement: 112.0% | Variance: +12.0%
Mine B (BCCL Underground): Target: 9.4 MT | Actual: 8.7 MT | Achievement: 92.6% | Variance: -7.4%
Mine C (CCL OpenCast): Target: 11.0 MT | Actual: 11.4 MT | Achievement: 103.6% | Variance: +3.6%
Total Aggregate Coal Production: 31.3 MT (Target: 30.4 MT)
Total Aggregate Coal Dispatch: 29.8 MT
"""
    page1 = DocumentPage(id="page-doc1-1", document_id=doc1.id, page_number=1, text_content=p1_text, ocr_applied=False)
    db.add(page1)

    # Evidence & Metrics for Doc 1
    ev1 = EvidenceCitation(
        id="ev-production-a",
        document_id=doc1.id,
        document_name=doc1.name,
        page_number=1,
        table_reference="Table 1: Row 1",
        snippet="Mine A (ECL OpenCast): Target: 10.0 MT | Actual: 11.2 MT | Achievement: 112.0%",
        confidence=98
    )
    ev2 = EvidenceCitation(
        id="ev-production-b",
        document_id=doc1.id,
        document_name=doc1.name,
        page_number=1,
        table_reference="Table 1: Row 2",
        snippet="Mine B (BCCL Underground): Target: 9.4 MT | Actual: 8.7 MT | Achievement: 92.6%",
        confidence=98
    )
    ev3 = EvidenceCitation(
        id="ev-production-c",
        document_id=doc1.id,
        document_name=doc1.name,
        page_number=1,
        table_reference="Table 1: Row 3",
        snippet="Mine C (CCL OpenCast): Target: 11.0 MT | Actual: 11.4 MT | Achievement: 103.6%",
        confidence=97
    )
    db.add_all([ev1, ev2, ev3])

    m1 = ExtractedMetric(
        id="metric-mine-a-prod",
        document_id=doc1.id,
        page_number=1,
        table_reference="Table 1",
        entity_type="production",
        mine_name="Mine A",
        subsidiary="ECL",
        period="Mar 2025",
        actual_value=11.2,
        target_value=10.0,
        unit="MT",
        variance_percent=12.0,
        confidence=98,
        review_status="verified",
        source_snippet=ev1.snippet,
        evidence_id=ev1.id
    )
    m2 = ExtractedMetric(
        id="metric-mine-b-prod",
        document_id=doc1.id,
        page_number=1,
        table_reference="Table 1",
        entity_type="production",
        mine_name="Mine B",
        subsidiary="BCCL",
        period="Mar 2025",
        actual_value=8.7,
        target_value=9.4,
        unit="MT",
        variance_percent=-7.4,
        confidence=98,
        review_status="verified",
        source_snippet=ev2.snippet,
        evidence_id=ev2.id
    )
    m3 = ExtractedMetric(
        id="metric-mine-c-prod",
        document_id=doc1.id,
        page_number=1,
        table_reference="Table 1",
        entity_type="production",
        mine_name="Mine C",
        subsidiary="CCL",
        period="Mar 2025",
        actual_value=11.4,
        target_value=11.0,
        unit="MT",
        variance_percent=3.6,
        confidence=97,
        review_status="verified",
        source_snippet=ev3.snippet,
        evidence_id=ev3.id
    )
    db.add_all([m1, m2, m3])

    # Chunks for Doc 1
    chunks1 = RAGRetrieverService.chunk_text(p1_text)
    for idx, c in enumerate(chunks1):
        db.add(DocumentChunk(
            id=f"chunk-doc1-{idx}",
            document_id=doc1.id,
            page_number=1,
            chunk_index=idx,
            chunk_text=c,
            section_title="Monthly Production Summary"
        ))

    # -------------------------------------------------------------
    # Document 2: CMPDI Geological Assessment Report
    # -------------------------------------------------------------
    doc2 = Document(
        id="doc-geol-cmpdi-2025",
        name="CMPDI_Geological_Exploration_Block_IV.pdf",
        file_type="pdf",
        file_path="sample-data/CMPDI_Geological_Exploration_Block_IV.pdf",
        file_size_bytes=2450120,
        confidence_score=94,
        total_pages=4,
        subsidiary="CMPDI",
        period="FY 2024-25",
        source_provenance="CMPDI Regional Institute Geological Block Report",
        status="ready"
    )
    db.add(doc2)

    p2_text = """CENTRAL MINE PLANNING & DESIGN INSTITUTE LIMITED (CMPDI)
GEOLOGICAL EXPLORATION & RESOURCE ESTIMATION REPORT - BLOCK IV
Stratigraphy & Seam Correlation:
The block consists of Barakar formation strata with coal seams I, II, III, IV, and V.
Major Seams: Seam IV (Average Thickness 6.8m, non-coking coal Grade G8, Gross Calorific Value 4950 kcal/kg).
Seam V (Average Thickness 4.2m, Grade G10, GCV 4320 kcal/kg).
Structural Geology: Identified East-West trending normal Fault F1 with 12m throw.
Geological Reserves: Estimated Proved Reserves: 142.5 MT. Indicated Reserves: 38.0 MT.
Borehole Drilling Summary: Total 24 boreholes completed totaling 4,850 meters of core drilling.
Stripping Ratio anticipated for OpenCast planning: 3.45 Cu.M/Tonne.
"""
    page2 = DocumentPage(id="page-doc2-1", document_id=doc2.id, page_number=1, text_content=p2_text, ocr_applied=False)
    db.add(page2)

    ev_geo = EvidenceCitation(
        id="ev-cmpdi-reserves",
        document_id=doc2.id,
        document_name=doc2.name,
        page_number=1,
        table_reference="Section 3: Reserves",
        snippet="Geological Reserves: Estimated Proved Reserves: 142.5 MT. Indicated Reserves: 38.0 MT.",
        confidence=95
    )
    db.add(ev_geo)

    m_geo = ExtractedMetric(
        id="metric-cmpdi-res",
        document_id=doc2.id,
        page_number=1,
        table_reference="Section 3",
        entity_type="reserve",
        mine_name="Block IV Exploration",
        subsidiary="CMPDI",
        period="FY 2024-25",
        actual_value=142.5,
        target_value=None,
        unit="MT",
        variance_percent=None,
        confidence=95,
        review_status="verified",
        source_snippet=ev_geo.snippet,
        evidence_id=ev_geo.id
    )
    db.add(m_geo)

    chunks2 = RAGRetrieverService.chunk_text(p2_text)
    for idx, c in enumerate(chunks2):
        db.add(DocumentChunk(
            id=f"chunk-doc2-{idx}",
            document_id=doc2.id,
            page_number=1,
            chunk_index=idx,
            chunk_text=c,
            section_title="CMPDI Geological Assessment"
        ))

    # -------------------------------------------------------------
    # Document 3: Synthetic Low-Confidence Scanned Document (For Anomaly / Review Demo)
    # -------------------------------------------------------------
    doc3 = Document(
        id="doc-scanned-dispatch-legacy",
        name="Scanned_Legacy_Dispatch_Challan_2024.pdf",
        file_type="scanned_pdf",
        file_path="sample-data/synthetic/Scanned_Legacy_Dispatch_Challan_2024.pdf",
        file_size_bytes=789200,
        confidence_score=68,
        total_pages=1,
        subsidiary="BCCL",
        period="Nov 2024",
        source_provenance="Synthetic Historical Scanned Dispatch Ledger (Low-Res)",
        status="review_required"
    )
    db.add(doc3)

    p3_text = """[OCR SCAN - 150 DPI HISTORICAL LEDGER]
BCCL AREA IX - DISPATCH CHALLAN
Rly Siding No: 4 | Coal Grade: ~G11 [OCR Low Confidence]
Recorded Weight: ~4.2 MT [Review Flagged: Blurred numeral 4 vs 1]
Target Allocation: 5.0 MT
"""
    page3 = DocumentPage(id="page-doc3-1", document_id=doc3.id, page_number=1, text_content=p3_text, ocr_applied=True)
    db.add(page3)

    ev_scan = EvidenceCitation(
        id="ev-scanned-flagged",
        document_id=doc3.id,
        document_name=doc3.name,
        page_number=1,
        table_reference="OCR Box 2",
        snippet="Recorded Weight: ~4.2 MT [Review Flagged: Blurred numeral 4 vs 1]",
        confidence=68
    )
    db.add(ev_scan)

    m_scan = ExtractedMetric(
        id="metric-scanned-dispatch",
        document_id=doc3.id,
        page_number=1,
        table_reference="OCR Box 2",
        entity_type="dispatch",
        mine_name="Area IX Siding",
        subsidiary="BCCL",
        period="Nov 2024",
        actual_value=4.2,
        target_value=5.0,
        unit="MT",
        variance_percent=-16.0,
        confidence=68,
        review_status="pending_review",
        source_snippet=ev_scan.snippet,
        evidence_id=ev_scan.id
    )
    db.add(m_scan)

    # -------------------------------------------------------------
    # Active Alerts
    # -------------------------------------------------------------
    alt1 = Alert(
        id="alt-production-b",
        severity="high",
        title="Mine B is 7.4% below production target",
        detail="Actual production was 8.7 MT against target 9.4 MT ((8.7 - 9.4)/9.4 × 100 = -7.4%).",
        alert_type="target_miss",
        status="active",
        evidence_id=ev2.id,
        document_id=doc1.id
    )
    alt2 = Alert(
        id="alt-low-conf-scan",
        severity="medium",
        title="Low-confidence OCR detected on legacy dispatch challan",
        detail="Document Scanned_Legacy_Dispatch_Challan_2024.pdf has an overall confidence score of 68%. Data Officer verification required.",
        alert_type="low_confidence_ocr",
        status="active",
        evidence_id=ev_scan.id,
        document_id=doc3.id
    )
    db.add_all([alt1, alt2])

    db.commit()
    print("Initial seed data successfully committed to SQLite database.")
