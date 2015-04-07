# HeadlessProtractor
run protractor test on headless ubuntu server in docker

## Some step you could follow.
git config --global credential.helper 'cache --timeout=7776000’
git clone http://your_git_domain/git/your_product your_product
git checkout --track develop

## your_name is current user name
sudo useradd -g docker your_name
sudo usermod -a -G docker your_name

## re-login or reboot

sudo chown -R your_name:your_name ~/.npm_docker

cd HeadlessProtractor/docker
./rebuild.sh

cd HeadlessProtractor/protractor
./run-uitest.sh
