---
date: "2019-09-26"
title: "Kali Linux with Docker for Windows"
categories:
  - LINUX

---

![Victoria Harbour, Hongkong](./photo-kt456d_645dhfh6dgjkhg4_d.jpg)

<!-- TOC -->

- [Installing Kali](#installing-kali)
- [Installing Tools](#installing-tools)
- [Committing the Image](#committing-the-image)
- [Starting Kali Containers](#starting-kali-containers)

<!-- /TOC -->


## Installing Kali

see available docker images on [Docker Hub](https://hub.docker.com/u/kalilinux)


```bash
docker pull kalilinux/kali-rolling
``` 

```bash
docker run -it kalilinux/kali-rolling /bin/bash
```


## Installing Tools

```bash
apt update && apt full-upgrade && apt auto-remove && apt auto-clean
``` 

```bash
apt-get install kali-linux-full
```


See [available packages](https://www.kali.org/news/kali-linux-metapackages/)


* kali-linux
* kali-linux-all
* kali-linux-forensic
* kali-linux-full
* kali-linux-gpu
* kali-linux-pwtools
* kali-linux-rfid
* kali-linux-sdr
* kali-linux-top10
* kali-linux-voip
* kali-linux-web
* kali-linux-wireless


Checked contained programs in packages:


```bash
apt-cache show kali-linux-wireless |grep Depends
```


## Committing the Image

```bash
docker ps -a
```

```bash
docker start {containerID}
docker attach {containerID}
docker commit {containerID} kali
docker images
docker rm {containerID}
```


## Starting Kali Containers

```bash
docker run -ti -rm kali /bin/bash
```


```bash
docker run -it --rm -p 4444:4444 kali
```