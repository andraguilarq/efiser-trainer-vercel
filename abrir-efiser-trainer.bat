@echo off
title EFISER Trainer
cd /d "%~dp0"
echo.
if not exist "node_modules" (
  echo Preparando EFISER Trainer por primera vez. Puede tardar unos minutos...
  call npm.cmd install
  if errorlevel 1 (
    echo.
    echo No se pudo preparar la aplicacion. Revisa tu conexion a internet e intentalo otra vez.
    pause
    exit /b 1
  )
)
echo Iniciando EFISER Trainer...
echo Manten esta ventana abierta mientras estudias.
echo.
start "" powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 4; Start-Process 'http://127.0.0.1:5173/'"
npm.cmd run dev -- --host 127.0.0.1 --port 5173
pause
