from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.db_models import DocumentChunk, ExtractedMetric, EvidenceCitation
from ..schemas.api_schemas import AskRequest, AskResponse, EvidenceSchema
from ..services.rag_service import RAGRetrieverService
from ..services.ai_service import LocalAIService

router = APIRouter(prefix="/api/assistant", tags=["Assistant"])

@router.get("/suggested-questions")
def get_suggested_questions():
    return {
        "questions": [
            "Which mine missed its production target in March 2025?",
            "What is the composite stripping ratio for OpenCast planning?",
            "What are the estimated proved coal reserves in Block IV?",
            "Compare the production performance across ECL, BCCL, and CCL.",
            "Which documents require Data Officer review due to low OCR confidence?"
        ]
    }

@router.post("/ask", response_model=AskResponse)
async def ask_assistant(req: AskRequest, db: Session = Depends(get_db)):
    chunks_query = db.query(DocumentChunk).all()
    chunk_dicts = [
        {
            "id": c.id,
            "document_id": c.document_id,
            "page_number": c.page_number,
            "chunk_text": c.chunk_text,
            "section_title": c.section_title
        }
        for c in chunks_query
    ]

    retrieved = RAGRetrieverService.search_chunks(req.question, chunk_dicts, top_k=4)

    metrics_query = db.query(ExtractedMetric).all()
    metric_dicts = [
        {
            "id": m.id,
            "mine_name": m.mine_name,
            "subsidiary": m.subsidiary,
            "actual_value": m.actual_value,
            "target_value": m.target_value,
            "unit": m.unit,
            "variance_percent": m.variance_percent,
            "entity_type": m.entity_type,
            "evidence_id": m.evidence_id
        }
        for m in metrics_query
    ]

    evidences_query = db.query(EvidenceCitation).all()
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
        for e in evidences_query
    ]

    result = await LocalAIService.ask_assistant_with_rag(
        req.question,
        retrieved,
        metric_dicts,
        evidence_dicts
    )

    formatted_ev = [
        EvidenceSchema(
            id=ev["id"],
            document_id=ev["document_id"],
            document_name=ev["document_name"],
            page_number=ev["page_number"],
            table_reference=ev.get("table_reference"),
            snippet=ev["snippet"],
            confidence=ev["confidence"]
        )
        for ev in result["evidence"]
    ]

    return AskResponse(
        answer=result["answer"],
        calculations=result["calculations"],
        evidence=formatted_ev,
        verified=result["verified"],
        confidence=result["confidence"],
        grounding_details=result["grounding_details"]
    )
