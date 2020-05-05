---
date: "2020-01-12"
title: "Web traffic redirection with Node and Express on CentOS8"
categories:
  - LINUX

---

![Shenzhen, China](./photo-kt443t6d_64hdh43hfh6dgjdfhg4_d.jpg)



<!-- TOC -->

- [Installing Node JS](#installing-node-js)
- [Installing Greenlock Express](#installing-greenlock-express)
- [Installing Process Monitor 2](#installing-process-monitor-2)

<!-- /TOC -->


## Installing Node JS


Follow [the instruction](https://github.com/nodesource/distributions/blob/master/README.md#rpm) for your version of Node.js:


```bash
# As root
curl -sL https://rpm.nodesource.com/setup_14.x | bash -

# No root privileges 
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
```


Run the following to install Node.js 14.x and npm:


```bash
sudo yum install -y nodejs
```


You may also need development tools to build native addons:


```bash
sudo yum install gcc-c++ make
```


## Installing Greenlock Express

[Greenlock Express](https://www.npmjs.com/package/greenlock-express) is a Web Server with Fully Automated HTTPS and renewals.


```bash
mkdir /opt/web-redirection
cd /opt/web-redirection
npm init
npm install greenlock-express@v4
```








## Installing Process Monitor 2

[PM2](https://pm2.keymetrics.io) is a daemon process manager that will help you manage and keep your application online 24/7:


```bash
npm install pm2 -g
```