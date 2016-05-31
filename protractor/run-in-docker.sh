#!/bin/bash
BASE_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
SHARED_FOLDER="$BASE_DIR/report"
USER_ID=`id -u`
DOCKER_TEST_IMAGE="headless/testing:1"

START=$SECONDS

# Read only volume - source code
SOURCES_VOLUME=" -v $BASE_DIR:/src "

# node_modules volume
NODE_MODULES_VOLUME=" -v /src/node_modules "

# npm repository volume
NPM_REPO_VOLUME=" -v $HOME/.npm_docker:/npm "

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
# default server IP to localhost
if [ -z "$DISPLAY_SIZE" ]; then
  DISPLAY_SIZE="1280x800x16"
fi

ENV=" -e UNITY_HOSTNAME=$UNITY_HOSTNAME -e UNITY_BASEPORT=$UNITY_BASEPORT -e GRUNT_OPTIONS=$GRUNT_OPTIONS -e DISPLAY_SIZE=$DISPLAY_SIZE"
echo ENV=$ENV

# default result code
RESULT=0

if [ "$RESULT" == 0 ]; then
  echo "Launching tests..."
  ALL_PARAMETER="$SOURCES_VOLUME $ENV $NODE_MODULES_VOLUME $OUT_VOLUME $NPM_REPO_VOLUME $REPORT_VOLUME $DOCKER_TEST_IMAGE"
  if [ "$(uname)" == "Linux" ]; then
    ALL_PARAMETER="$ALL_PARAMETER $USER_ID"
  fi
  echo "docker run  --privileged --rm  -t $ALL_PARAMETER"
  docker run  --privileged --rm  -t $ALL_PARAMETER
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

