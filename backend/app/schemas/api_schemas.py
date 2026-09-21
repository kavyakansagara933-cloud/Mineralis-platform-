from __future__ import annotations

from typing import Literal, Any
from pydantic import BaseModel, Field

class EvidenceSchema(BaseModel):
    id: str
    document_id: str
    document_name: str
    page_number: int
    table_reference: str | None = None
    snippet: str
    confidence: int = Field(ge=0, le=100)

class ExtractedMetricSchema(BaseModel):
    id: str
    document_id: str
    page_number: int
    table_reference: str | None = None
    entity_type: str
    mine: str
    subsidiary: str
    period: str
    actual: float
    target: float | None = None
    unit: str
    variance_percent: float | None = None
    confidence: int
    status: str
    review_status: str
    snippet: str
    evidence_id: str | None = None

class DocumentListItemSchema(BaseModel):
    id: str
    name: str
    type: str
    pages: int
    confidence: int
    status: str
    subsidiary: str
    uploaded_at: str
    period: str
    source_provenance: str

class DocumentDetailSchema(BaseModel):
    id: str
    name: str
    type: str
    pages: int
    confidence: int
    status: str
    subsidiary: str
    uploaded_at: str
    period: str
    source_provenance: str
    extracted_metrics: list[ExtractedMetricSchema]
    evidence: list[EvidenceSchema]
    meta_info: dict[str, Any] = {}

class KPICardSchema(BaseModel):
    label: str
    value: str
    change: str
    tone: Literal["positive", "negative", "neutral", "warning"]

class ProductionTrendItemSchema(BaseModel):
    period: str
    production: float
    target: float | None = None
    dispatch: float | None = None

class AlertSchema(BaseModel):
    id: str
    severity: Literal["high", "medium", "low", "info"]
    title: str
    detail: str
    evidence: EvidenceSchema | None = None
    status: str = "active"
    created_at: str

class DashboardResponseSchema(BaseModel):
    kpis: list[KPICardSchema]
    production_trend: list[ProductionTrendItemSchema]
    subsidiary_comparison: list[dict[str, Any]]
    mine_performance: list[ExtractedMetricSchema]
    alerts: list[AlertSchema]

class AskRequest(BaseModel):
    question: str = Field(min_length=2, max_length=1500)

class AskResponse(BaseModel):
    answer: str
    calculations: list[str]
    evidence: list[EvidenceSchema]
    verified: bool
    confidence: int
    grounding_details: str

class ReportRequest(BaseModel):
    report_type: Literal[
        "monthly_production",
        "geological_summary",
        "mine_performance",
        "subsidiary_comparison",
        "management_summary",
    ]
    period: str
    organization: str = "Coal India Limited"
    mine: str | None = None
    instructions: str | None = None

class ReportSectionSchema(BaseModel):
    heading: str
    content: str

class ReportResponse(BaseModel):
    id: str
    title: str
    report_type: str
    period: str
    organization: str
    status: str
    sections: list[ReportSectionSchema]
    metrics: list[ExtractedMetricSchema]
    evidence: list[EvidenceSchema]
    pdf_url: str | None = None
    docx_url: str | None = None

class TopicItemSchema(BaseModel):
    term: str
    category: str  # Geological, Operational, Chemical, Equipment
    count: int
    sample_snippet: str
    document_ids: list[str]

class MetricVerificationRequest(BaseModel):
    actual_value: float | None = None
    target_value: float | None = None
    review_status: Literal["verified", "rejected"]
