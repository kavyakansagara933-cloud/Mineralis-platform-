from __future__ import annotations

import os
import asyncio
import random
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .config import STORAGE_DIR, UPLOAD_DIR
from .database import engine, Base
from .routers import (
    dashboard_router,
    documents_router,
    assistant_router,
    reports_router,
    analytics_router,
    alerts_router,
    topics_router,
    fleet_router,
    audit_router
)

# Initialize database schema
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MINERALIS Core API (MIRA Engine)",
    description="High-performance backend for deterministic mining operations intelligence, statutory audit certification, and HEMM fleet digital twins.",
    version="2.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount upload directory for document preview
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/static/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Include Routers
app.include_router(dashboard_router.router)
app.include_router(documents_router.router)
app.include_router(assistant_router.router)
app.include_router(reports_router.router)
app.include_router(analytics_router.router)
app.include_router(alerts_router.router)
app.include_router(topics_router.router)
app.include_router(fleet_router.router)
app.include_router(audit_router.router)

@app.get("/")
def root():
    return {
        "platform": "MINERALIS Core API (MIRA Engine)",
        "version": "2.0.0",
        "status": "healthy",
        "features": [
            "Deterministic Mathematical Calculation Engine",
            "Autonomous AI Statutory Audit & Risk Certification",
            "Multi-Format PC Document Ingestion & OCR Bounding Boxes",
            "HEMM Fleet Telematics & Digital Twin Simulator",
            "Real-Time WebSocket Streaming (/ws/telematics)"
        ]
    }

@app.get("/health")
def health_check():
    return {"status": "ok", "version": "2.0.0"}

# WebSocket Telemetry Stream for Fleet Digital Twin
@app.websocket("/ws/telematics")
async def websocket_telematics_stream(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Generate subtle realistic jitter on telemetry readings
            jitter_data = {
                "timestamp": str(asyncio.get_event_loop().time()),
                "units": [
                    {
                        "id": u["id"],
                        "code": u["code"],
                        "rpm": u["engineRpm"] + random.randint(-15, 15) if u["status"] == "Operating" else 0,
                        "coolantTemp": round(u["coolantTempC"] + random.uniform(-0.2, 0.2), 1),
                        "hydraulicBar": u["hydraulicPressureBar"] + random.randint(-3, 3) if u["status"] == "Operating" else 0,
                        "vibration": round(max(0.5, u["vibrationMmSec"] + random.uniform(-0.05, 0.05)), 2)
                    }
                    for u in fleet_router.active_fleet
                ]
            }
            await websocket.send_json(jitter_data)
            await asyncio.sleep(2.0)
    except WebSocketDisconnect:
        pass
