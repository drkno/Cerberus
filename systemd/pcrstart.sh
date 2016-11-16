#!/bin/bash

echo Starting PCR1000 Network Server
tmux new-session -d -s pcrserver 'sudo /opt/pcr1000/PCRNetworkServer.exe -d /dev/ttyAMA0'
tmux detach -s pcrserver
echo Starting DarkIce
tmux new-session -d -s darkice 'sudo darkice'
tmux detach -s darkice
sleep 5
echo Starting Cerberus
tmux new-session -d -s cerberus 'cd /opt/cerberus && sudo ./start.sh'
tmux detach -s cerberus
echo Startup Complete