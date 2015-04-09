#!/bin/bash
BASE_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
cd $BASE_DIR

echo ---------------- ubuntu-base-java
cd ubuntu-base-java
./rebuild.sh
cd $BASE_DIR

echo ---------------- ubuntu-headless
cd ubuntu-headless
./rebuild.sh
cd $BASE_DIR

