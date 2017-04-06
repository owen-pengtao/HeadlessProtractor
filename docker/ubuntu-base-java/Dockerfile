FROM ubuntu:14.04

MAINTAINER Owen Peng

# Install build and apt stuff.
RUN \
  sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list && \
  apt-get update && \
  apt-get install -y \ 
  	build-essential \
  	software-properties-common \
  	byobu \
  	curl \
  	git \
  	htop \
  	man \
  	unzip \
  	vim \
  	wget && \
  DEBIAN_FRONTEND=noninteractive apt-get install -y \
  	lxde-core \ 
  	lxterminal \
  	tightvncserver \
  	firefox && \
  rm -rf /var/lib/apt/lists/*

# install Chrome
RUN \
  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list && \
  apt-get update && \
  apt-get install -y google-chrome-stable && \
  rm -rf /var/lib/apt/lists/*

# Install Java
RUN \
  echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | debconf-set-selections && \
  add-apt-repository -y ppa:webupd8team/java && \
  apt-get update && \
  apt-get install -y oracle-java8-installer && \
  rm -rf /var/lib/apt/lists/* && \
  rm -rf /var/cache/oracle-jdk8-installer

# Define JAVA_HOME variable
ENV JAVA_HOME /usr/lib/jvm/java-8-oracle

##Disable Defaults requiretty in sudoers file
RUN  sed -i "s/Defaults    requiretty.*/ #Defaults    requiretty/g" /etc/sudoers

# install NodeJS
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo bash -
RUN apt-get install -y nodejs
RUN npm install -g grunt-cli
