from __future__ import annotations

import asyncio
import random
from typing import List
from datetime import datetime
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from pydantic import BaseModel

router = APIRouter(prefix="/api/fleet", tags=["Fleet Telematics"])

INITIAL_FLEET_DATA = [
    {
        "id": "unit-dl-01",
        "code": "DL-2496-01",
        "name": "Walking Dragline 24/96 Heavy Rig",
        "type": "Dragline",
        "division": "Division A",
        "mine": "Northern Horizon Open Cast",
        "status": "Operating",
        "healthScore": 94,
        "availabilityPct": 88.5,
        "utilizationPct": 82.1,
        "fuelBurnLph": 0.0,
        "payloadTonnes": 54.0,
        "maxCapacityTonnes": 60.0,
        "engineRpm": 1200,
        "coolantTempC": 68.0,
        "hydraulicPressureBar": 310,
        "vibrationMmSec": 1.8,
        "subsystems": { "engine": 96, "hydraulics": 92, "transmission": 95, "undercarriage": 90, "bucketTool": 91 },
        "telemetryLog": ["Hoist motor inverter in sync", "Swing gear vibration normal (1.8 mm/s)", "Tub pressure balanced at 310 bar"]
    },
    {
        "id": "unit-es-02",
        "code": "SH-4200-03",
        "name": "Electric Rope Shovel 42m³ Ultra",
        "type": "Electric Shovel",
        "division": "Division B",
        "mine": "Eastern Ridge Deep Mine",
        "status": "Operating",
        "healthScore": 89,
        "availabilityPct": 84.2,
        "utilizationPct": 79.4,
        "fuelBurnLph": 0.0,
        "payloadTonnes": 92.0,
        "maxCapacityTonnes": 100.0,
        "engineRpm": 1450,
        "coolantTempC": 72.0,
        "hydraulicPressureBar": 295,
        "vibrationMmSec": 2.4,
        "subsystems": { "engine": 92, "hydraulics": 86, "transmission": 88, "undercarriage": 85, "bucketTool": 87 },
        "telemetryLog": ["Crowd motor thermal gradient +1.2°C/hr", "Dipper teeth wear level 18% (Acceptable)", "Auto-lube cycle executed"]
    },
    {
        "id": "unit-dp-03",
        "code": "DP-240T-14",
        "name": "Heavy Hauler Cat 793F 240-Tonne",
        "type": "Dumper 240T",
        "division": "Division A",
        "mine": "Northern Horizon Open Cast",
        "status": "Operating",
        "healthScore": 91,
        "availabilityPct": 86.8,
        "utilizationPct": 81.0,
        "fuelBurnLph": 142.0,
        "payloadTonnes": 236.0,
        "maxCapacityTonnes": 240.0,
        "engineRpm": 1850,
        "coolantTempC": 86.0,
        "hydraulicPressureBar": 215,
        "vibrationMmSec": 2.1,
        "subsystems": { "engine": 93, "hydraulics": 90, "transmission": 91, "undercarriage": 88, "bucketTool": 95 },
        "telemetryLog": ["Grade resistance 8.4% on In-Pit Ramp 3", "Brake cooling oil temperature 78°C", "Payload weight verified at 236.4 T"]
    },
    {
        "id": "unit-dp-04",
        "code": "DP-240T-19",
        "name": "Heavy Hauler Komatsu 930E 240-Tonne",
        "type": "Dumper 240T",
        "division": "Division C",
        "mine": "Central Quarry Block 4",
        "status": "Fault Tripped",
        "healthScore": 61,
        "availabilityPct": 62.0,
        "utilizationPct": 44.5,
        "fuelBurnLph": 178.0,
        "payloadTonnes": 0.0,
        "maxCapacityTonnes": 240.0,
        "engineRpm": 950,
        "coolantTempC": 104.0,
        "hydraulicPressureBar": 165,
        "vibrationMmSec": 6.8,
        "subsystems": { "engine": 54, "hydraulics": 62, "transmission": 68, "undercarriage": 70, "bucketTool": 90 },
        "telemetryLog": ["CRITICAL: Coolant temp spike 104°C (Limit: 98°C)", "Hydraulic manifold delta-P warning", "Auto-shutdown interlock triggered"]
    },
    {
        "id": "unit-sm-05",
        "code": "SM-2200-02",
        "name": "Wirtgen 2200 Surface Continuous Miner",
        "type": "Surface Miner",
        "division": "Division D",
        "mine": "Southern Plateau Section 2",
        "status": "Operating",
        "healthScore": 95,
        "availabilityPct": 91.2,
        "utilizationPct": 87.6,
        "fuelBurnLph": 88.0,
        "payloadTonnes": 450.0,
        "maxCapacityTonnes": 500.0,
        "engineRpm": 2100,
        "coolantTempC": 81.0,
        "hydraulicPressureBar": 280,
        "vibrationMmSec": 1.4,
        "subsystems": { "engine": 97, "hydraulics": 94, "transmission": 96, "undercarriage": 93, "bucketTool": 94 },
        "telemetryLog": ["Cutting drum rotational torque steady at 9,400 Nm", "Dust suppression spray active at 4.2 bar", "Clean coal discharge to conveyor"]
    }
]

# In-memory working copy
active_fleet = list(INITIAL_FLEET_DATA)

class FaultInjectionRequest(BaseModel):
    unit_id: str
    subsystem: str

@router.get("/units")
def get_fleet_units():
    return {
        "success": True,
        "total_units": len(active_fleet),
        "operating_units": sum(1 for u in active_fleet if u["status"] == "Operating"),
        "fleet": active_fleet
    }

@router.post("/inject-fault")
def inject_subsystem_fault(req: FaultInjectionRequest):
    global active_fleet
    for u in active_fleet:
        if u["id"] == req.unit_id:
            if req.subsystem in u["subsystems"]:
                u["subsystems"][req.subsystem] = max(20, u["subsystems"][req.subsystem] - 40)
                avg_health = round(sum(u["subsystems"].values()) / len(u["subsystems"]))
                u["healthScore"] = avg_health
                if avg_health < 70:
                    u["status"] = "Fault Tripped"
                if req.subsystem == "engine":
                    u["coolantTempC"] = 106.8
                elif req.subsystem == "hydraulics":
                    u["hydraulicPressureBar"] = 145
                u["telemetryLog"].insert(0, f"[SIMULATED FAULT]: High stress on {req.subsystem.upper()} subsystem!")
                u["telemetryLog"] = u["telemetryLog"][:5]
                return {"success": True, "unit": u}
    return {"success": False, "error": "Unit not found"}

@router.post("/reset-fleet")
def reset_fleet_telematics():
    global active_fleet
    active_fleet = [dict(u) for u in INITIAL_FLEET_DATA]
    return {"success": True, "message": "Fleet digital twin telemetry reset to nominal"}
