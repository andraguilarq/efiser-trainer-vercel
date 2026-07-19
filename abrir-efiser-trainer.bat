@echo off
title EFISER Trainer
cd /d "%~dp0"
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" "http://127.0.0.1:5173/"
echo.
echo Iniciando EFISER Trainer...
echo Mantén esta ventana abierta mientras uses la app.
echo Si Chrome abre antes de tiempo, espera 5 segundos y presiona Ctrl+R.
echo.
npm.cmd run dev -- --host 127.0.0.1 --port 5173
pause
