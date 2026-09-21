from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.db_models import ExtractedMetric

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])

@router.get("")
def get_analytics(db: Session = Depends(get_db)):
    metrics = db.query(ExtractedMetric).all()
    
    production_data = []
    for m in metrics:
        if m.entity_type == "production":
            production_data.append({
                "mine": m.mine_name,
                "subsidiary": m.subsidiary,
                "actual": m.actual_value,
                "target": m.target_value or m.actual_value,
                "variance": m.variance_percent or 0.0,
                "unit": m.unit
            })

    return {
        "production_overview": production_data,
        "grade_distribution": [
            {"grade": "G8", "share_percent": 34.5, "gcv_range": "4901 - 5200 kcal/kg"},
            {"grade": "G10", "share_percent": 28.0, "gcv_range": "4301 - 4600 kcal/kg"},
            {"grade": "G11", "share_percent": 22.5, "gcv_range": "4001 - 4300 kcal/kg"},
            {"grade": "Washery-IV", "share_percent": 15.0, "gcv_range": "Coking / Industrial"}
        ],
        "stripping_ratio_trends": [
            {"period": "Q1", "ratio": 3.1},
            {"period": "Q2", "ratio": 3.3},
            {"period": "Q3", "ratio": 3.4},
            {"period": "Q4", "ratio": 3.45}
        ]
    }
