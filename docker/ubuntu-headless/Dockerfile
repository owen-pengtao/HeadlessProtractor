FROM headless/ubuntu-base-java:8

RUN apt-get update \
    && apt-get install -y --force-yes --no-install-recommends  \
        lxde x11vnc xvfb \
        python \
        gtk2-engines-murrine ttf-ubuntu-font-family \
        firefox \
        wget \
    && apt-get autoclean \
    && apt-get autoremove

RUN \
  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list && \
  apt-get update && \
  apt-get install -y google-chrome-stable && \
  rm -rf /var/lib/apt/lists/*

ADD init_build.sh /root/
RUN chmod +x /root/init_build.sh

WORKDIR /root

RUN mkdir -p /src

RUN mkdir -p /npm

EXPOSE 5900

# default user ID
CMD ["1000"]

# The script have to be run as root, it will fix the permissions for volumes and initiate
# actual maven build as 'builder' user
ENTRYPOINT ["./init_build.sh"]
