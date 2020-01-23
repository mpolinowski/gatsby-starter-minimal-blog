---
date: "2019-09-13"
title: "Magento 2 and Varnish 5"
categories:
  - LINUX
  - Magento

---

![Victoria Harbour, Hongkong](./photo-kt456d_645dhfh6dgjkhg4_d.jpg)

<!-- TOC -->

- [Install Varnish 5 on Debian 10](#install-varnish-5-on-debian-10)

<!-- /TOC -->


## Install Varnish 5 on Debian 10

Add the packagecloud GPG key so that the repository will be authenticated and verified:


```bash
wget https://packagecloud.io/varnishcache/varnish5/gpgkey -O - | sudo apt-key add -
```


Make sure you have these packages for using https repositories:


```bash
sudo apt-get install apt-transport-https debian-archive-keyring -y
```


Add the Varnish 5 repository from packagecloud for Debian Buster (10):


```bash
echo "deb https://packagecloud.io/varnishcache/varnish5/debian/ buster main" | sudo tee -a /etc/apt/sources.list.d/varnishcache_varnish5.list
echo "deb-src https://packagecloud.io/varnishcache/varnish5/debian/ buster main" | sudo tee -a /etc/apt/sources.list.d/varnishcache_varnish5.list
apt update
```

__NO RELEASE OF VARNISH 5 AVAILABLE FOR DEBIAN BUSTER__ Have to wait for Magento update to support for Varnish 6.....