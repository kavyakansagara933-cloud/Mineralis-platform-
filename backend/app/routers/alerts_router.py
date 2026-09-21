from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.db_models import Alert, EvidenceCitation
from ..schemas.api_schemas import AlertSchema, EvidenceSchema

router = APIRouter(prefix="/api/alerts", tags=["Alerts"])

@router.get("", response_model=list[AlertSchema])
def list_alerts(db: Session = Depends(get_db)):
    alerts = db.query(Alert).order_by(Alert.created_at.desc()).all()
    evidences = {e.id: e for e in db.query(EvidenceCitation).all()}

    res = []
    for a in alerts:
        ev_obj = evidences.get(a.evidence_id)
        ev_schema = None
        if ev_obj:
            ev_schema = EvidenceSchema(
                id=ev_obj.id,
                document_id=ev_obj.document_id,
                document_name=ev_obj.document_name,
                page_number=ev_obj.page_number,
                table_reference=ev_obj.table_reference,
                snippet=ev_obj.snippet,
                confidence=ev_obj.confidence
            )
        res.append(AlertSchema(
            id=a.id,
            severity=a.severity if a.severity in ["high", "medium", "low", "info"] else "medium",
            title=a.title,
            detail=a.detail,
            evidence=ev_schema,
            status=a.status,
            created_at=str(a.created_at)
        ))
    return res

@router.post("/{alert_id}/resolve")
def resolve_alert(alert_id: str, db: Session = Depends(get_db)):
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    alert.status = "resolved"
    db.commit()
    return {"status": "success", "alert_id": alert_id, "alert_status": "resolved"}
