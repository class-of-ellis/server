#!/bin/bash

apt-get update
apt-get upgrade

apt-get install git nodejs npm

mkdir /proj

cd /proj

git clone https://github.com/class-of-ellis/server


