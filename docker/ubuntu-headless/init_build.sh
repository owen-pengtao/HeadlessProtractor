#!/bin/sh

start_time=$SECONDS

# path where source is mounted
BASE_SRC=/src

# name for user who is performing the build
USER=uitester

# result code
RESULT=0

# user ID for user mapping, passed as argument
USER_ID=$1

echo "Requested user ID: $USER_ID"
useradd -m -u $USER_ID $USER
	
# mapping the target folder to folder inside the container, so the builds on host (like IDE) will not affects it 
mkdir /out-target
chown $USER /out-target
mount --bind /out-target $BASE_SRC/target

# permissions to write in node_modules
chown $USER $BASE_SRC/node_modules

cd $BASE_SRC

#set the location of npm cache
sudo -u $USER HOME="/home/$USER" npm config set cache /npm

# setup XWindows
/usr/bin/Xvfb :1 -screen 0 1024x768x16 &
export DISPLAY=:1

x11vnc -display "$DISPLAY" -xkb &

echo "UNITY_HOSTNAME=$UNITY_HOSTNAME"
echo "UNITY_BASEPORT=$UNITY_BASEPORT"

# Build code as uitester
sudo -u $USER HOME="/home/$USER" UNITY_HOSTNAME=$UNITY_HOSTNAME UNITY_BASEPORT=$UNITY_BASEPORT DISPLAY="$DISPLAY" npm install
sudo -u $USER HOME="/home/$USER" UNITY_HOSTNAME=$UNITY_HOSTNAME UNITY_BASEPORT=$UNITY_BASEPORT DISPLAY="$DISPLAY" grunt install
echo "grunt test:e2e $GRUNT_OPTIONS"
sudo -u $USER HOME="/home/$USER" UNITY_HOSTNAME=$UNITY_HOSTNAME UNITY_BASEPORT=$UNITY_BASEPORT DISPLAY="$DISPLAY" grunt test:e2e $GRUNT_OPTIONS

######################################################

if [ $? -ne 0 ]; then
	# failed to build
	RESULT=1
fi

umount $BASE_SRC/target

finish_time=$SECONDS
elapsed_time="$((finish_time - start_time)) sec."
echo "$finish_time - $start_time"

# done
if [ $RESULT -eq 0 ]; then
	echo "Done - success in $elapsed_time"
	exit 0
else
	echo "Build failed! (in $elapsed_time)"
	exit $RESULT
fi
