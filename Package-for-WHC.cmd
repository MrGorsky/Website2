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
"%SystemRoot%\System32\tar.exe" -a -c -f hamelphoto-upload.zip -C dist . || goto :error

echo.
echo Done: hamelphoto-upload.zip is ready to upload to WHC.
explorer /select,"%~dp0hamelphoto-upload.zip"
pause
goto :eof

:error
echo.
echo Something went wrong. See the messages above.
pause
