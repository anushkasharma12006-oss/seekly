@echo off
echo ==================================================
echo   Starting Seekly AI Search Engine...
echo ==================================================

start "Seekly Backend" cmd /k "cd backend && python -m uvicorn main:app --host 127.0.0.1 --port 8000"
start "Seekly Frontend" cmd /k "cd frontend && npm run dev"

echo Seekly is launching!
echo Backend:  http://127.0.0.1:8000
echo Frontend: http://localhost:5173
pause
