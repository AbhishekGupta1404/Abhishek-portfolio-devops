@echo off
echo Starting Vercel build...

REM Clean previous build
if exist dist rmdir /s /q dist

REM Install dependencies
call npm ci

REM Build the project
call npm run build

echo Build completed successfully!
