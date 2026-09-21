# 🏆 MINERALIS — Engineering Portfolio Showcase

## Project Overview
**MINERALIS** is a production-grade Mining Operations & Intelligence Platform engineered to demonstrate advanced full-stack systems design, deterministic calculation engines, real-time WebSocket telematics, and OCR provenance tracking.

---

## 🎯 3-Minute Live Demo Flow

When presenting this project to recruiters, engineering leads, or clients, use the following interactive click-through story:

### 1. Executive Operations & Command Palette (`0:00 - 0:45`)
- **Action**: Navigate to `http://localhost:3000/dashboard`.
- **Showcase**:
  - Point out the low-strain enterprise light theme and the crisp Architectural "M" brand mark.
  - Open the **Division Drill-Down Drawer** to show granular open-cast vs underground pit statistics.
  - Press `Ctrl+K` (or `⌘K`) to demonstrate the instant **Global Command Palette**, filtering across 315 mines.
  - Switch role to **Field Mine Manager** to demonstrate the adaptive **Pithead Shift Muster Panel** (blasting clearance, 450 GPM sump pump telemetry).

### 2. Heavy Machinery Fleet Digital Twin & GIS Map (`0:45 - 1:45`)
- **Action**: Navigate to `http://localhost:3000/analytics`.
- **Showcase**:
  - Show the live **Geospatial Pit GIS Map** with interactive topographical elevation contours, strata seams, and live GPS haulage markers.
  - Scroll to the **HEMM Fleet Telematics Digital Twin** connected via real-time WebSocket (`/ws/telematics`).
  - Click **Inject Fault** on the Walking Dragline (e.g. Engine or Hydraulics) to demonstrate real-time fault tripping, telemetry log recording, and automatic health score degradation.
  - Click **Reset Fleet Telematics** to restore nominal conditions.

### 3. MIRA Conversational Intelligence & Deterministic Evidence (`1:45 - 2:30`)
- **Action**: Navigate to `http://localhost:3000/ai-query`.
- **Showcase**:
  - Ask: *"Which mine recorded the highest stripping ratio and production shortfall?"*
  - Demonstrate MIRA's response with **zero hallucination**, showing the exact algebraic variance formula and clickable **Evidence Provenance Badges**.
  - Click the **Inspect Proof** badge to open the **Split-Screen OCR Bounding-Box Reader**, showing the exact cell coordinates extracted from the document page.

### 4. Statutory Report Generator & Digital Seals (`2:30 - 3:00`)
- **Action**: Navigate to `http://localhost:3000/reports`.
- **Showcase**:
  - Select **Management Summary Report** for FY 2024-25 and click **Generate Official Report**.
  - Highlight the generated SHA-256 digital certificate seal (`CERT-FY24-XXXX`) and click **Export PDF / Word (.docx)**.

---

## 🛠️ Technical Competencies Demonstrated

| Category | Skills & Technologies |
| :--- | :--- |
| **Frontend Architecture** | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Recharts, SVG GIS rendering. |
| **Backend Engineering** | FastAPI, Python 3.13, Uvicorn, Asynchronous WebSockets, Pydantic, SQLAlchemy ORM. |
| **Database & Persistence** | SQLite (12 relational tables: documents, telematics units, evidence citations, audit certificates, metrics). |
| **Data Processing & OCR** | Multi-format parsing (PDF, Excel, DOCX), bounding-box coordinate mapping, deterministic variance algorithms. |
| **Real-Time Systems** | Bidirectional WebSocket telemetry streaming (`/ws/telematics`) with simulated sensor jitter and fault injection. |
| **DevOps & Distribution** | 1-click batch and PowerShell launchers (`run_mineralis.bat`, `run_mineralis.ps1`), modular architecture. |
