# HeadlessProtractor
run protractor test on headless ubuntu server in docker

# Some step you could follow.
cd your_product/docker
./rebuild.sh

git config --global credential.helper 'cache --timeout=7776000’
git clone http://your_git_domain/git/your_product your_product
git checkout --track develop

#your_name is current user name
sudo useradd -g docker your_name
sudo usermod -a -G docker your_name

#re-login or reboot, then

sudo chown -R your_name:your_name ~/.npm_docker

cd your_product/protractor
./run-uitest.sh
