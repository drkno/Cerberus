#!/bin/bash

nohup node cerberus.js & disown 2>&1 > /dev/null
exit 0
