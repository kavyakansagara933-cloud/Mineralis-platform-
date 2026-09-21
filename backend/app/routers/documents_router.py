from __future__ import annotations

import shutil
from pathlib import Path
from uuid import uuid4
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from ..database import get_db
from ..config import UPLOADS_DIR
from ..models.db_models import Document, DocumentPage, ExtractedMetric, DocumentChunk, EvidenceCitation, Alert
from ..schemas.api_schemas import DocumentListItemSchema, DocumentDetailSchema, ExtractedMetricSchema, EvidenceSchema, MetricVerificationRequest
from ..services.parser_service import DocumentParserService
from ..services.extractor_service import MiningExtractorService
from ..services.rag_service import RAGRetrieverService

router = APIRouter(prefix="/api/documents", tags=["Documents"])

@router.get("", response_model=dict)
def list_documents(db: Session = Depends(get_db)):
    docs = db.query(Document).order_by(Document.uploaded_at.desc()).all()
    items = []
    for d in docs:
        items.append({
            "id": d.id,
            "name": d.name,
            "type": d.file_type,
            "pages": d.total_pages,
            "confidence": d.confidence_score,
            "status": d.status,
            "subsidiary": d.subsidiary,
            "uploaded_at": str(d.uploaded_at),
            "period": d.period,
            "source_provenance": d.source_provenance
        })
    return {"items": items, "total": len(items)}

@router.get("/{document_id}", response_model=DocumentDetailSchema)
def get_document(document_id: str, db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    metrics = db.query(ExtractedMetric).filter(ExtractedMetric.document_id == document_id).all()
    evidence = db.query(EvidenceCitation).filter(EvidenceCitation.document_id == document_id).all()

    formatted_metrics = []
    for m in metrics:
        formatted_metrics.append(ExtractedMetricSchema(
            id=m.id,
            document_id=m.document_id,
            page_number=m.page_number,
            table_reference=m.table_reference,
            entity_type=m.entity_type,
            mine=m.mine_name,
            subsidiary=m.subsidiary,
            period=m.period,
            actual=m.actual_value,
            target=m.target_value,
            unit=m.unit,
            variance_percent=m.variance_percent,
            confidence=m.confidence,
            status="alert" if (m.variance_percent is not None and m.variance_percent < -5) else "good",
            review_status=m.review_status,
            snippet=m.source_snippet,
            evidence_id=m.evidence_id
        ))

    formatted_evidence = []
    for e in evidence:
        formatted_evidence.append(EvidenceSchema(
            id=e.id,
            document_id=e.document_id,
            document_name=e.document_name,
            page_number=e.page_number,
            table_reference=e.table_reference,
            snippet=e.snippet,
            confidence=e.confidence
        ))

    return DocumentDetailSchema(
        id=doc.id,
        name=doc.name,
        type=doc.file_type,
        pages=doc.total_pages,
        confidence=doc.confidence_score,
        status=doc.status,
        subsidiary=doc.subsidiary,
        uploaded_at=str(doc.uploaded_at),
        period=doc.period,
        source_provenance=doc.source_provenance,
        extracted_metrics=formatted_metrics,
        evidence=formatted_evidence,
        meta_info=doc.meta_info or {}
    )

@router.post("/upload", status_code=202)
async def upload_document(file: UploadFile = File(...), db: Session = Depends(get_db)) -> dict:
    file_id = f"doc-{uuid4().hex[:8]}"
    clean_filename = file.filename.replace(" ", "_")
    target_path = UPLOADS_DIR / f"{file_id}_{clean_filename}"

    with open(target_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    file_size = target_path.stat().st_size

    # Real Document Intelligence & Parsing
    parsed = DocumentParserService.parse_file(target_path, clean_filename)
    total_pages = parsed.get("total_pages", 1)
    file_type = parsed.get("file_type", "pdf")
    base_confidence = parsed.get("confidence", 90)

    # Domain Entity Extraction
    extracted = MiningExtractorService.extract_entities_from_pages(parsed["pages"], file_id, clean_filename)

    status = "ready" if base_confidence >= 80 else "review_required"

    # Create Document record
    doc = Document(
        id=file_id,
        name=clean_filename,
        file_type=file_type,
        file_path=str(target_path),
        file_size_bytes=file_size,
        confidence_score=base_confidence,
        total_pages=total_pages,
        subsidiary=extracted.get("subsidiary", "General"),
        period=extracted.get("period", ""),
        source_provenance="Direct User Upload & Local OCR/Docling Ingestion",
        status=status,
        meta_info={"extracted_metrics_count": len(extracted["metrics"])}
    )
    db.add(doc)

    # Add Pages
    for p in parsed["pages"]:
        page_rec = DocumentPage(
            id=f"page-{file_id}-{p['page_number']}",
            document_id=file_id,
            page_number=p["page_number"],
            text_content=p.get("text", ""),
            ocr_applied=p.get("ocr_applied", False)
        )
        db.add(page_rec)

        # Create search chunks
        chunks = RAGRetrieverService.chunk_text(p.get("text", ""))
        for idx, c in enumerate(chunks):
            db.add(DocumentChunk(
                id=f"chunk-{file_id}-p{p['page_number']}-{idx}",
                document_id=file_id,
                page_number=p["page_number"],
                chunk_index=idx,
                chunk_text=c,
                section_title=f"Page {p['page_number']}"
            ))

    # Add Evidence Citations
    for ev in extracted["evidence"]:
        db.add(EvidenceCitation(
            id=ev["id"],
            document_id=file_id,
            document_name=clean_filename,
            page_number=ev["page_number"],
            table_reference=ev.get("table_reference"),
            snippet=ev["snippet"],
            confidence=ev["confidence"]
        ))

    # Add Metrics
    for m in extracted["metrics"]:
        db.add(ExtractedMetric(
            id=m["id"],
            document_id=file_id,
            page_number=m["page_number"],
            table_reference=m.get("table_reference"),
            entity_type=m["entity_type"],
            mine_name=m["mine_name"],
            subsidiary=m["subsidiary"],
            period=m["period"],
            actual_value=m["actual_value"],
            target_value=m["target_value"],
            unit=m["unit"],
            variance_percent=m["variance_percent"],
            confidence=m["confidence"],
            review_status=m["review_status"],
            source_snippet=m["source_snippet"],
            evidence_id=m["evidence_id"]
        ))

    # Add Alerts
    for alt in extracted["alerts"]:
        db.add(Alert(
            id=alt["id"],
            severity=alt["severity"],
            title=alt["title"],
            detail=alt["detail"],
            alert_type="target_miss",
            status="active",
            evidence_id=alt.get("evidence_id"),
            document_id=file_id
        ))

    db.commit()

    return {
        "id": file_id,
        "name": clean_filename,
        "pages": total_pages,
        "confidence": base_confidence,
        "status": status,
        "extracted_metrics": len(extracted["metrics"]),
        "message": "File processed successfully with full page/table evidence extraction."
    }

@router.post("/{document_id}/metrics/{metric_id}/verify")
def verify_metric(document_id: str, metric_id: str, req: MetricVerificationRequest, db: Session = Depends(get_db)):
    metric = db.query(ExtractedMetric).filter(
        ExtractedMetric.document_id == document_id,
        ExtractedMetric.id == metric_id
    ).first()
    if not metric:
        raise HTTPException(status_code=404, detail="Metric not found")

    if req.actual_value is not None:
        metric.actual_value = req.actual_value
    if req.target_value is not None:
        metric.target_value = req.target_value
    metric.review_status = req.review_status
    metric.confidence = 100 if req.review_status == "verified" else metric.confidence

    db.commit()
    return {"status": "success", "review_status": metric.review_status, "confidence": metric.confidence}
