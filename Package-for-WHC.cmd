@echo off
rem Double-click to build the site for hamelphoto.com and make hamelphoto-upload.zip
rem for WHC (cPanel File Manager: upload to public_html, then Extract).
title Hamel Photo - package for WHC
cd /d "%~dp0"

if not exist node_modules (
  echo Installing dependencies, first run only...
  call npm install || goto :error
)

rem Build for the real domain (no test-copy settings).
set SITE_URL=
set BASE_PATH=

echo Building the site for https://hamelphoto.com ...
call npm run build || goto :error
echo.
echo Checking the pages...
call npm run check || goto :error

if exist hamelphoto-upload.zip del hamelphoto-upload.zip
rem PowerShell 7's zip stores no Unix permissions, so cPanel extracts with its defaults (644/755).
rem Not tar.exe (stores 666/777: world-writable on the server) nor Windows PowerShell 5
rem (writes backslashes in paths, which Linux extracts as odd file names).
pwsh -NoProfile -Command "[IO.Compression.ZipFile]::CreateFromDirectory('dist', 'hamelphoto-upload.zip')" || goto :error

echo.
echo Done: hamelphoto-upload.zip is ready to upload to WHC.
explorer /select,"%~dp0hamelphoto-upload.zip"
pause
goto :eof

:error
echo.
echo Something went wrong. See the messages above.
pause
