#!/bin/bash
BASE_DIR=`pwd`

echo ---------------- ubuntu-base-java
cd ubuntu-base-java
./rebuild.sh
cd $BASE_DIR

echo ---------------- ubuntu-headless
cd ubuntu-headless
./rebuild.sh
cd $BASE_DIR

