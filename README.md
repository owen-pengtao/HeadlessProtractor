# HeadlessProtractor
run protractor test on headless ubuntu server in docker
## Step 1: Install docker on ubuntu
Docker installation: https://docs.docker.com/installation/ubuntulinux/
<pre>
  wget -qO- https://get.docker.com/ | sh
  sudo usermod -aG docker <current_username_on_ubuntu>
</pre>
then, logout and relogin ubuntu.

## Step 2: Checkout code, build docker image
<pre>
#git clone https://github.com/owen-pengtao/HeadlessProtractor.git HeadlessProtractor
#cd HeadlessProtractor/docker
#./rebuild.sh
#sudo chown -R your_name:your_name ~/.npm_docker
</pre>

## Step 3: Run protractor test in docker
<pre>
#cd HeadlessProtractor/protractor
#./run-uitest.sh
</pre>

## Manually Verify protractor test as same as it's running in docker.
<pre>
npm install
grunt install
grunt test:e2e
</pre>
