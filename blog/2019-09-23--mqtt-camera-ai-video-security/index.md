---
date: "2019-09-23"
title: "MQTT Camera AI Enhanced Security"
categories:
  - MQTT
  - Smarthome
  - IoT
  - Node-RED

---

![Central, Hong Kong](./photo-kt443t6d_64hdh43hfh6dgjdfhg4_d.jpg)



<!-- TOC -->

- [Installation](#installation)
  - [Installing Python 3 on CentOS 8](#installing-python-3-on-centos-8)
  - [Installing Node.js 13 on CentOS 8](#installing-nodejs-13-on-centos-8)
  - [Installing Node-RED on CentOS 8](#installing-node-red-on-centos-8)

<!-- /TOC -->

> THIS IS WIP


## Installation

Start by downloading [AI_enhanced_video_security](https://github.com/wb666greene/AI_enhanced_video_security) by @wb666greene from Github:


```bash
cd /opt
git clone https://github.com/wb666greene/AI_enhanced_video_security.git
```


### Installing Python 3 on CentOS 8


```bash
sudo dnf install python3
python3 --version
Python 3.6.8
pip3 --version
pip 9.0.3 from /usr/lib/python3.6/site-packages (python 3.6)
```


```bash
pip3 install paho-mqtt numpy requests imutils pillow opencv-contrib-python
```


### Installing Node.js 13 on CentOS 8


```bash
# As root
curl -sL https://rpm.nodesource.com/setup_13.x | bash -

# No root privileges 
# curl -sL https://rpm.nodesource.com/setup_13.x | sudo bash -

yum install gcc-c++ make
# or: yum groupinstall 'Development Tools'

yum -y install nodejs npm
```


### Installing Node-RED on CentOS 8


```bash
npm install -g --unsafe-perm node-red
```

Once installed as a global module you can use the node-red command to start Node-RED in your terminal. You can use Ctrl-C or close the terminal window to stop Node-RED. You can then access the Node-RED editor by pointing your browser at `http://localhost:1880`.


Install the following Node-RED modules:


```bash
node-red-contrib-ftp-server
node-red-contrib-simple-gate
```

Import the following [Node-RED Flow](https://raw.githubusercontent.com/wb666greene/AI_enhanced_video_security/master/FTP_image_to_AI_via_MQTT.json):