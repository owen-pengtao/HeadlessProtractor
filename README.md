# HeadlessProtractor
run protractor test on headless ubuntu server in docker
## Step 1: Install docker on ubuntu
Docker installation: https://docs.docker.com/installation/ubuntulinux/

For Mac: https://docs.docker.com/docker-for-mac/install/

For Ubuntu: https://docs.docker.com/engine/installation/linux/ubuntu/
<pre>
if you have installed, try to upgrade.
#docker-machine upgrade
</pre>
then, logout and relogin ubuntu.

## Step 2: Checkout code, build docker image
<pre>
#git clone https://github.com/owen-pengtao/HeadlessProtractor.git HeadlessProtractor
#cd HeadlessProtractor/docker
#./rebuild_all.sh
</pre>

if you are using ubuntu, maybe need run below command to change folder ~/.npm_docker owner and group.
<pre>
#sudo chown -R your_name:your_group ~/.npm_docker
</pre>

## Step 3: Run protractor test in docker
<pre>
#cd HeadlessProtractor/protractor
#./run-in-docker.sh
</pre>

## Manually Verify protractor test as same as it's running in docker.
<pre>
#cd HeadlessProtractor/protractor
#npm install
#grunt install
#grunt test:e2e
</pre>
