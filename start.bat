@echo off
setlocal
title Lingua Quest - World Atlas

cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js belum terpasang.
  echo Download dan install dari https://nodejs.org, lalu jalankan file ini lagi.
  pause
  exit /b 1
)

if not exist node_modules\ (
  echo [SETUP] Menginstall dependensi... tunggu sebentar.
  call npm install --no-audit --no-fund
  if errorlevel 1 (
    echo [ERROR] npm install gagal. Periksa koneksi internet, lalu coba lagi.
    pause
    exit /b 1
  )
)

echo [DEV] Menjalankan Lingua Quest... browser akan terbuka otomatis.
echo Tekan Ctrl+C atau tutup jendela ini untuk berhenti.
call npm run dev -- --open

pause
