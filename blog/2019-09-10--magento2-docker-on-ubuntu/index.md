---
date: "2019-09-10"
title: "Magento 2 Dev Environment with Docker Compose"
categories:
  - Docker
  - Magento

---

![Angkor Wat, Cambodia](./photo-kt456d_645dhfh6dgjkhg4_d.jpg)

<!-- TOC -->

- [Getting Started](#getting-started)
    - [Download Docker Magento2](#download-docker-magento2)
    - [Download Magento2 Source Code](#download-magento2-source-code)
- [Spinning up your Containers](#spinning-up-your-containers)
    - [Problems](#problems)
    - [Reinstalling Docker Compose](#reinstalling-docker-compose)

<!-- /TOC -->



## Getting Started


### Download Docker Magento2

Clone the following [repository](https://github.com/fballiano/docker-magento2):


```bash
cd /opt
sudo git clone https://github.com/fballiano/docker-magento2.git
cd /docker-magento2
```


Then start all containers with `docker-compose` - make sure that you have both [Docker](https://docs.docker.com/engine/install/ubuntu/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your system.


### Download Magento2 Source Code

[Download Magento 2](https://magento.com/tech-resources/download) in any way you want (zip/tgz from website, composer, etc) and extract in the __magento2__ subdirectory of this project - __right next to the docker-compose.yml__!



## Spinning up your Containers

```bash
sudo docker-compose up -d
```


### Problems

```bash
sudo docker-compose up -d
ERROR: 
        Can't find a suitable configuration file in this directory or any
        parent. Are you in the right directory?

        Supported filenames: docker-compose.yml, docker-compose.yaml
```


### Reinstalling Docker Compose


First, confirm the latest version available in their [releases page](https://github.com/docker/compose/releases). At the time of this writing, the most current stable version is `1.26.0`.

The following command will download the 1.26.0 release and save the executable file at /usr/local/bin/docker-compose, which will make this software globally accessible as docker-compose:


```
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

Set the correct permissions so that the docker-compose command is executable:


```bash
sudo chmod +x /usr/local/bin/docker-compose
```


Verify that the installation was successful:


```bash
docker-compose --version

docker-compose version 1.26.0, build d4451659
```


Retry to `sudo docker-compose up -d` - it should work now.



```bash
docker-compose up -d
Creating network "docker-magento2_default" with the default driver
Creating volume "docker-magento2_dbdata" with default driver
Pulling db (mariadb:)...
latest: Pulling from library/mariadb
23884877105a: Pull complete
bc38caa0f5b9: Pull complete
2910811b6c42: Pull complete
36505266dcc6: Pull complete

...
```


















