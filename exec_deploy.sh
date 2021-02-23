#!/bin/bash

cd /home/ubuntu/app/deploy
cp variables.env ./zip
cd ./zip

if screen -list | grep "bachang"; then
        echo "Exit running bachang..."
        screen -SX bachang quit
fi

echo "Start bachang..."
screen -dmS bachang ./start.sh