# HeadlessProtractor
run protractor test on headless ubuntu server in docker

## Some step you could follow.
  cache your credential for 7776000 seconds
<pre>
#git config --global credential.helper 'cache --timeout=7776000'
#git clone http://your_git_domain/git/your_product your_product
#git checkout --track develop
#sudo useradd -g docker your_name
#sudo usermod -a -G docker your_name
</pre>

## Verify protractor test could be running
<pre>
npm install
grunt install
grunt test:e2e
</pre>

## re-login or reboot
<pre>
#sudo chown -R your_name:your_name ~/.npm_docker

#cd HeadlessProtractor/docker
#./rebuild.sh

#cd HeadlessProtractor/protractor
#./run-uitest.sh
</pre>
