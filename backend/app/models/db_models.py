from __future__ import annotations

from datetime import datetime
from uuid import uuid4
from sqlalchemy import Column, String, Integer, Float, Text, DateTime, ForeignKey, Boolean, JSON
from sqlalchemy.orm import relationship

from ..database import Base

def gen_uuid(prefix: str = "id") -> str:
    return f"{prefix}-{uuid4().hex[:8]}"

class Document(Base):
    __tablename__ = "documents"

    id = Column(String, primary_key=True, default=lambda: gen_uuid("doc"))
    name = Column(String, nullable=False)
    file_type = Column(String, nullable=False)  # pdf, scanned_pdf, xlsx, docx, csv, png, jpg
    file_path = Column(String, nullable=False)
    file_size_bytes = Column(Integer, default=0)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String, default="ready")  # ready, processing, review_required, failed
    confidence_score = Column(Integer, default=98)
    total_pages = Column(Integer, default=1)
    subsidiary = Column(String, default="Central Operations")
    period = Column(String, default="FY 2023-24")
    source_provenance = Column(String, default="Mining Intelligence Platform / Central Regulatory Authority")
    sha256_hash = Column(String, nullable=True)
    meta_info = Column(JSON, default=dict)

    pages = relationship("DocumentPage", back_populates="document", cascade="all, delete-orphan")
    metrics = relationship("ExtractedMetric", back_populates="document", cascade="all, delete-orphan")
    chunks = relationship("DocumentChunk", back_populates="document", cascade="all, delete-orphan")
    evidence_items = relationship("EvidenceCitation", back_populates="document", cascade="all, delete-orphan")
    tables = relationship("DocumentTable", back_populates="document", cascade="all, delete-orphan")

class DocumentPage(Base):
    __tablename__ = "document_pages"

    id = Column(String, primary_key=True, default=lambda: gen_uuid("page"))
    document_id = Column(String, ForeignKey("documents.id"), nullable=False)
    page_number = Column(Integer, nullable=False)
    text_content = Column(Text, default="")
    ocr_applied = Column(Boolean, default=False)
    image_preview_path = Column(String, nullable=True)

    document = relationship("Document", back_populates="pages")

class DocumentTable(Base):
    __tablename__ = "document_tables"

    id = Column(String, primary_key=True, default=lambda: gen_uuid("tbl"))
    document_id = Column(String, ForeignKey("documents.id"), nullable=False)
    page_number = Column(Integer, default=1)
    table_name = Column(String, default="Extracted Table")
    headers_json = Column(JSON, default=list)
    rows_json = Column(JSON, default=list)
    bbox_json = Column(JSON, default=dict)  # {x, y, w, h}

    document = relationship("Document", back_populates="tables")

class ExtractedMetric(Base):
    __tablename__ = "extracted_metrics"

    id = Column(String, primary_key=True, default=lambda: gen_uuid("metric"))
    document_id = Column(String, ForeignKey("documents.id"), nullable=False)
    page_number = Column(Integer, default=1)
    table_reference = Column(String, nullable=True)
    entity_type = Column(String, nullable=False)  # production, target, dispatch, ob_removal, stripping_ratio, grade, gcv, manpower, seam, reserve, borehole, strata, fault
    mine_name = Column(String, nullable=False)
    subsidiary = Column(String, nullable=False)
    period = Column(String, default="")
    actual_value = Column(Float, nullable=False)
    target_value = Column(Float, nullable=True)
    unit = Column(String, default="MT")
    variance_percent = Column(Float, nullable=True)
    confidence = Column(Integer, default=95)
    review_status = Column(String, default="verified")  # verified, pending_review, rejected
    source_snippet = Column(Text, default="")
    evidence_id = Column(String, nullable=True)

    document = relationship("Document", back_populates="metrics")

class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(String, primary_key=True, default=lambda: gen_uuid("chunk"))
    document_id = Column(String, ForeignKey("documents.id"), nullable=False)
    page_number = Column(Integer, default=1)
    chunk_index = Column(Integer, default=0)
    chunk_text = Column(Text, nullable=False)
    section_title = Column(String, default="")
    embedding_json = Column(JSON, nullable=True)

    document = relationship("Document", back_populates="chunks")

class EvidenceCitation(Base):
    __tablename__ = "evidence_citations"

    id = Column(String, primary_key=True, default=lambda: gen_uuid("ev"))
    document_id = Column(String, ForeignKey("documents.id"), nullable=False)
    document_name = Column(String, nullable=False)
    page_number = Column(Integer, default=1)
    table_reference = Column(String, nullable=True)
    snippet = Column(Text, nullable=False)
    bbox = Column(JSON, default=lambda: {"x": 48, "y": 142, "w": 520, "h": 110})
    confidence = Column(Integer, default=98)
    created_at = Column(DateTime, default=datetime.utcnow)

    document = relationship("Document", back_populates="evidence_items")

class AuditCertificate(Base):
    __tablename__ = "audit_certificates"

    id = Column(String, primary_key=True, default=lambda: gen_uuid("cert"))
    ledger_id = Column(String, unique=True, nullable=False)
    fiscal_period = Column(String, nullable=False)
    division_scope = Column(String, nullable=False)
    status = Column(String, default="UNCONDITIONALLY CERTIFIED")
    rules_evaluated_count = Column(Integer, default=14)
    rules_passed_count = Column(Integer, default=14)
    critical_discrepancies = Column(Integer, default=0)
    sha256_seal = Column(String, nullable=False)
    issued_at = Column(DateTime, default=datetime.utcnow)
    issued_by = Column(String, default="Autonomous AI Statutory Audit Subsystem")
    audit_summary = Column(Text, default="")
    meta_data = Column(JSON, default=dict)

class ExecutiveSlide(Base):
    __tablename__ = "executive_slides"

    id = Column(String, primary_key=True, default=lambda: gen_uuid("slide"))
    deck_id = Column(String, default="default-deck")
    slide_order = Column(Integer, default=0)
    title = Column(String, nullable=False)
    category = Column(String, default="Scorecard")
    subtitle = Column(String, default="")
    metrics_json = Column(JSON, default=list)
    takeaways_json = Column(JSON, default=list)
    director_notes = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow)

class CustomFormula(Base):
    __tablename__ = "custom_formulas"

    id = Column(String, primary_key=True, default=lambda: gen_uuid("form"))
    name = Column(String, nullable=False)
    description = Column(String, default="")
    expression_tokens_json = Column(JSON, default=list)
    unit = Column(String, default="")
    division_scope = Column(String, default="ALL")
    created_at = Column(DateTime, default=datetime.utcnow)

class FleetUnitRecord(Base):
    __tablename__ = "fleet_units"

    id = Column(String, primary_key=True, default=lambda: gen_uuid("unit"))
    code = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    unit_type = Column(String, nullable=False)
    division = Column(String, nullable=False)
    mine = Column(String, nullable=False)
    status = Column(String, default="Operating")
    health_score = Column(Integer, default=95)
    availability_pct = Column(Float, default=88.0)
    utilization_pct = Column(Float, default=82.0)
    fuel_burn_lph = Column(Float, default=120.0)
    engine_rpm = Column(Integer, default=1500)
    coolant_temp_c = Column(Float, default=78.0)
    hydraulic_pressure_bar = Column(Integer, default=280)
    vibration_mm_sec = Column(Float, default=1.8)
    subsystems_json = Column(JSON, default=dict)
    telemetry_logs_json = Column(JSON, default=list)
    last_updated = Column(DateTime, default=datetime.utcnow)

class Report(Base):
    __tablename__ = "reports"

    id = Column(String, primary_key=True, default=lambda: gen_uuid("rep"))
    title = Column(String, nullable=False)
    report_type = Column(String, nullable=False)
    period = Column(String, nullable=False)
    organization = Column(String, default="Mining Intelligence Platform")
    mine = Column(String, nullable=True)
    status = Column(String, default="ready")
    created_at = Column(DateTime, default=datetime.utcnow)
    executive_summary = Column(Text, default="")
    key_findings = Column(JSON, default=list)
    risk_indicators = Column(JSON, default=list)
    metrics_data = Column(JSON, default=list)
    evidence_data = Column(JSON, default=list)
    pdf_path = Column(String, nullable=True)
    docx_path = Column(String, nullable=True)

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(String, primary_key=True, default=lambda: gen_uuid("alt"))
    severity = Column(String, default="medium")  # high, medium, low, info
    title = Column(String, nullable=False)
    detail = Column(Text, nullable=False)
    alert_type = Column(String, default="target_miss")
    status = Column(String, default="active")  # active, acknowledged, resolved
    created_at = Column(DateTime, default=datetime.utcnow)
    evidence_id = Column(String, nullable=True)
    document_id = Column(String, nullable=True)
