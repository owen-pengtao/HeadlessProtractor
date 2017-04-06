#!/bin/sh

# pull dependencies
docker pull ubuntu:14.04

# build
docker build --rm=true -t headless/ubuntu-base-java:8 .
