#!/bin/bash
BASE_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
SUITE=""

if [ "$1" ]; then
    SUITE="--suite=$1"
fi

mkdir -p $REPORT_PATH
cd $BASE_DIR
UNITY_HOSTNAME=10.108.16.94 GRUNT_OPTIONS="$SUITE" ./run-in-docker.sh