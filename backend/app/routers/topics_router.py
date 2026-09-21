from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.db_models import Document

router = APIRouter(prefix="/api/topics", tags=["Topics"])

@router.get("")
def get_topics(db: Session = Depends(get_db)):
    docs = db.query(Document).all()

    return {
        "word_cloud": [
            {"text": "Proved Reserves (201.55 BT)", "value": 95, "category": "Geological", "sample": "Proved Coal Reserves assessed by CMPDI / GSI (Page 45)"},
            {"text": "Total Resources (378.21 BT)", "value": 90, "category": "Geological", "sample": "All-India Geological Coal Resources Inventory (Chapter 4)"},
            {"text": "MCL Production (206.8 MT)", "value": 88, "category": "Operational", "sample": "Mahanadi Coalfields highest producing subsidiary (Table 2.7)"},
            {"text": "SECL Production (187.5 MT)", "value": 84, "category": "Operational", "sample": "South Eastern Coalfields production statement (Table 2.6)"},
            {"text": "NCL Production (136.2 MT)", "value": 78, "category": "Operational", "sample": "Northern Coalfields opencast production summary (Table 2.4)"},
            {"text": "Seam IV (Grade G8)", "value": 72, "category": "Geological", "sample": "Barakar formation seam correlation, average thickness 6.8m"},
            {"text": "Stripping Ratio (3.45 Cu.M/T)", "value": 68, "category": "Operational", "sample": "Composite stripping ratio for opencast planning"},
            {"text": "GCV 4950 kcal/kg", "value": 65, "category": "Quality", "sample": "Gross calorific value classification under Coal Directory"}
        ],
        "total_categories": 6,
        "indexed_documents": len(docs)
    }
