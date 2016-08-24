#!/bin/bash

nohup node cerebus.js & disown 2>&1 > /dev/null
exit 0