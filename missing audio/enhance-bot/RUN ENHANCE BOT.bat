@echo off
title Re:Lefela - Adobe Enhance Bot (audio)
cd /d "%~dp0"

set "PY="
python --version >nul 2>&1 && set "PY=python"
if not defined PY ( py --version >nul 2>&1 && set "PY=py" )
if not defined PY (
  echo Python is not installed, or it is not on your PATH.
  echo.
  pause
  exit /b 1
)

echo ---------------------------------------------------------------
echo  Enhancing the mp3 files in "missing audio\Raw"
echo  Speech 50%%, Music 0%%, Background 0%%
echo.
echo  Do NOT run the Mindbourne enhance bot at the same time -
echo  they share one Adobe login and Chrome only allows one.
echo ---------------------------------------------------------------
echo.

%PY% "%~dp0enhance_bot.py" --all
echo.
echo ---------------------------------------------------------------
echo  Finished. You can close this window.
echo ---------------------------------------------------------------
pause
