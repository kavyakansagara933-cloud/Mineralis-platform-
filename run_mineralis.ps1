# MINERALIS Enterprise Platform PowerShell Launcher
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "         MINERALIS - Central Operations Mining Platform        " -ForegroundColor Cyan
Write-Host "         MIRA AI Engine & Real-Time Fleet Digital Twin          " -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "`n[1/3] Starting FastAPI Core Backend on http://127.0.0.1:8000..." -ForegroundColor Yellow
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", "Set-Location '$scriptDir\backend'; & .venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000"

Start-Sleep -Seconds 3

Write-Host "[2/3] Starting Next.js Frontend UI on http://localhost:3000..." -ForegroundColor Yellow
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", "Set-Location '$scriptDir\frontend'; npm run dev"

Start-Sleep -Seconds 5

Write-Host "[3/3] Launching web browser..." -ForegroundColor Green
Start-Process "http://localhost:3000"

Write-Host "`nMINERALIS is running live!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "Swagger Docs: http://127.0.0.1:8000/docs" -ForegroundColor White
