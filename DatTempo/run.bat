@echo off
cls
echo This script will keep DatTempo running even after crashing!
title DatTempo WatchDog
:StartServer
start /wait node index.js
echo (%time%) Server closed/crashed... restarting!
goto StartServer