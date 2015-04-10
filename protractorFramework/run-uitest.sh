#!/bin/bash
BASE_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
SUITE=""

if [ "$1" ]; then
    SUITE="--suite=$1"
fi

cd $BASE_DIR
SERVER_HOSTNAME="10.108.16.94:9680" BROWSER=firefox DISPLAY_SIZE=1920x1080x16 GRUNT_OPTIONS="$SUITE" ./run-in-docker.sh
