@echo off
title MINERALIS Platform Launcher
color 0B
echo ================================================================
echo          MINERALIS - Central Operations Mining Platform
echo          MIRA AI Engine & Real-Time Fleet Digital Twin
echo ================================================================
echo.

echo [1/3] Starting FastAPI Core Backend on http://127.0.0.1:8000 ...
start "MINERALIS Backend API" cmd /k "cd /d %~dp0backend && .venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000"

timeout /t 3 /nobreak >nul

echo [2/3] Starting Next.js Frontend UI on http://localhost:3000 ...
start "MINERALIS Frontend UI" cmd /k "cd /d %~dp0frontend && npm run dev"

timeout /t 5 /nobreak >nul

echo [3/3] Opening browser at http://localhost:3000 ...
start http://localhost:3000

echo.
echo ================================================================
echo MINERALIS is now running!
echo Frontend: http://localhost:3000
echo Backend API Docs: http://127.0.0.1:8000/docs
echo Close the terminal windows when done.
echo ================================================================
pause
