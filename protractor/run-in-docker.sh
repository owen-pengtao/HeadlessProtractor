#!/bin/bash

BASE_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
SHARED_FOLDER="/home/openg/Desktop/ApolloTest2"
USER_ID=`id -u`

START=$SECONDS

# Read only volume - source code
SOURCES_VOLUME=" -v $BASE_DIR:/src "

# node_modules volume
NODE_MODULES_VOLUME=" -v /src/node_modules "

# npm repository volume
NPM_REPO_VOLUME=" -v $HOME/.npm_docker:/npm "

mkdir -p target

REPORT_OUTPUT="$SHARED_FOLDER/htmlReports"
mkdir -p "$REPORT_OUTPUT"
REPORT_VOLUME=" -v $REPORT_OUTPUT:/src/report"

# Out folder, where the test results will be copied
OUT_VOLUME=" -v $SHARED_FOLDER:/out "
echo "USER_ID=$USER_ID"

# defaults for hostname and baseport
if [ -z "$UNITY_BASEPORT" ];  then
  UNITY_BASEPORT=9600
fi

# main host IP
if [ -z "$UNITY_HOSTNAME" ]; then
    UNITY_HOSTNAME="$MAIN_HOST_IP"
fi
# in case server IP is not specified, and we run on mac, take it from boot2docker
if [ -z "$UNITY_HOSTNAME" ]; then
    UNITY_HOSTNAME=`boot2docker ip 2>/dev/null`
fi
# default server IP to localhost
if [ -z "$UNITY_HOSTNAME" ]; then
    UNITY_HOSTNAME=127.0.0.1
fi

ENV=" -e UNITY_HOSTNAME=$UNITY_HOSTNAME -e UNITY_BASEPORT=$UNITY_BASEPORT -e GRUNT_OPTIONS=$GRUNT_OPTIONS"
echo ENV=$ENV

# default result code
RESULT=0

if [ "$RESULT" == 0 ]; then
	echo "Launching tests..."
  TEST_IMAGE="headless/testing:1"
	docker run  --privileged --rm  -t $SOURCES_VOLUME $ENV $NODE_MODULES_VOLUME $OUT_VOLUME $NPM_REPO_VOLUME $REPORT_VOLUME $TEST_IMAGE $USER_ID
	if [ "$?" -ne 0 ]; then
        RESULT=1
	fi
else
	echo "Failed to launch logu container, skipping tests..."
fi


#docker rm -fv "$TEST_CONTAINER_NAME" &> /dev/null
echo "Done."

echo "Finished in $((SECONDS-START)) sec."
exit "$RESULT"

