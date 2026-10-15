# SEEKLY - One-click Local Startup Script (PowerShell)
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " Starting Seekly AI Search Engine... " -ForegroundColor Magenta
Write-Host "==========================================" -ForegroundColor Cyan

$CurrentDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start FastAPI Backend in background job
Write-Host "[1/2] Starting Python FastAPI Backend on http://127.0.0.1:8000..." -ForegroundColor Yellow
$BackendProcess = Start-Process -FilePath "python" -ArgumentList "-m uvicorn main:app --host 127.0.0.1 --port 8000" -WorkingDirectory "$CurrentDir\backend" -PassThru

# Start Vite Frontend
Write-Host "[2/2] Starting React Vite Frontend on http://localhost:5173..." -ForegroundColor Green
Set-Location "$CurrentDir\frontend"
npm run dev

# When frontend stops, terminate backend
Stop-Process -Id $BackendProcess.Id -Force
Write-Host "Seekly shut down cleanly." -ForegroundColor Gray
