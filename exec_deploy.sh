#!/bin/bash

cd /home/ec2-user/dotols/deploy/baram

if screen -list | grep "dotols"; then
        echo "Exit running dotols..."
        screen -SX dotols quit
fi

echo "Start dotols..."
screen -dmS dotols ./start.sh