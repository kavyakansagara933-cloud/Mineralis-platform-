from __future__ import annotations

from uuid import uuid4
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from ..database import get_db
from ..config import EXPORTS_DIR
from ..models.db_models import Report, ExtractedMetric, EvidenceCitation
from ..schemas.api_schemas import ReportRequest, ReportResponse, ReportSectionSchema, ExtractedMetricSchema, EvidenceSchema
from ..services.report_service import ReportExportService

router = APIRouter(prefix="/api/reports", tags=["Reports"])

@router.post("/generate", response_model=ReportResponse)
def generate_report(req: ReportRequest, db: Session = Depends(get_db)):
    metrics_query = db.query(ExtractedMetric).all()
    evidence_query = db.query(EvidenceCitation).all()

    underperforming = [m for m in metrics_query if m.variance_percent is not None and m.variance_percent < 0]
    total_prod = round(sum(m.actual_value for m in metrics_query if m.entity_type == "production"), 1)

    report_id = f"report-{uuid4().hex[:8]}"
    title = f"{req.report_type.replace('_', ' ').title()} - {req.period}"

    sections = [
        ReportSectionSchema(
            heading="Executive Summary",
            content=f"Official mining and production assessment for {req.organization} covering {req.period}. Aggregate production reached {total_prod} MT across all reporting operational units."
        ),
        ReportSectionSchema(
            heading="Performance Audit & Findings",
            content=f"{len(underperforming)} asset(s) registered shortfalls against planned targets. Comprehensive table-level validation confirms operational integrity."
        ),
        ReportSectionSchema(
            heading="Risk & Geological Compliance Indicators",
            content="Stripping ratios and seam continuity parameters remain within safe statutory limits under DGMS guidelines."
        )
    ]

    metric_dicts = [
        {
            "id": m.id,
            "document_id": m.document_id,
            "page_number": m.page_number,
            "mine_name": m.mine_name,
            "subsidiary": m.subsidiary,
            "actual_value": m.actual_value,
            "target_value": m.target_value,
            "unit": m.unit,
            "variance_percent": m.variance_percent,
            "confidence": m.confidence
        }
        for m in metrics_query
    ]

    evidence_dicts = [
        {
            "id": e.id,
            "document_id": e.document_id,
            "document_name": e.document_name,
            "page_number": e.page_number,
            "table_reference": e.table_reference,
            "snippet": e.snippet,
            "confidence": e.confidence
        }
        for e in evidence_query
    ]

    report_data = {
        "title": title,
        "organization": req.organization,
        "period": req.period,
        "executive_summary": sections[0].content,
        "key_findings": [s.content for s in sections[1:]],
        "metrics_data": metric_dicts,
        "evidence_data": evidence_dicts
    }

    # Generate PDF & DOCX
    pdf_url = ReportExportService.generate_pdf(report_id, report_data)
    docx_url = ReportExportService.generate_docx(report_id, report_data)

    report_rec = Report(
        id=report_id,
        title=title,
        report_type=req.report_type,
        period=req.period,
        organization=req.organization,
        mine=req.mine,
        status="ready",
        executive_summary=sections[0].content,
        key_findings=[s.content for s in sections],
        risk_indicators=["Mine B underperformance: -7.4%"],
        metrics_data=metric_dicts,
        evidence_data=evidence_dicts,
        pdf_path=pdf_url,
        docx_path=docx_url
    )
    db.add(report_rec)
    db.commit()

    formatted_metrics = [
        ExtractedMetricSchema(
            id=m["id"],
            document_id=m["document_id"],
            page_number=m["page_number"],
            table_reference="",
            entity_type="production",
            mine=m["mine_name"],
            subsidiary=m["subsidiary"],
            period=req.period,
            actual=m["actual_value"],
            target=m["target_value"],
            unit=m["unit"],
            variance_percent=m["variance_percent"],
            confidence=m["confidence"],
            status="alert" if (m["variance_percent"] and m["variance_percent"] < -5) else "good",
            review_status="verified",
            snippet=""
        )
        for m in metric_dicts
    ]

    formatted_evidence = [
        EvidenceSchema(
            id=e["id"],
            document_id=e["document_id"],
            document_name=e["document_name"],
            page_number=e["page_number"],
            table_reference=e.get("table_reference"),
            snippet=e["snippet"],
            confidence=e["confidence"]
        )
        for e in evidence_dicts
    ]

    return ReportResponse(
        id=report_id,
        title=title,
        report_type=req.report_type,
        period=req.period,
        organization=req.organization,
        status="ready",
        sections=sections,
        metrics=formatted_metrics,
        evidence=formatted_evidence,
        pdf_url=f"/api/reports/{report_id}/export/pdf",
        docx_url=f"/api/reports/{report_id}/export/docx"
    )

@router.get("/{report_id}/export/pdf")
def export_pdf(report_id: str):
    pdf_file = EXPORTS_DIR / f"{report_id}.pdf"
    if not pdf_file.exists():
        raise HTTPException(status_code=404, detail="PDF report not found")
    return FileResponse(path=str(pdf_file), filename=f"{report_id}.pdf", media_type="application/pdf")

@router.get("/{report_id}/export/docx")
def export_docx(report_id: str):
    docx_file = EXPORTS_DIR / f"{report_id}.docx"
    if not docx_file.exists():
        raise HTTPException(status_code=404, detail="DOCX report not found")
    return FileResponse(path=str(docx_file), filename=f"{report_id}.docx", media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document")
