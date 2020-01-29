---
date: "2019-09-22"
title: "CentOS 8 Network Configuration"
categories:
  - LINUX

---

![Mong Kok, Hongkong](./photo-kt443t6d_64hdh43hfh6dgjdfhg4_d.jpg)



Check your network settings with `ip a` and `ip r`:


```bash
ip a

2: enp2s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether b0:6e:bf:1d:d3:2a brd ff:ff:ff:ff:ff:ff
    inet 192.168.2.111/24 brd 192.168.2.255 scope global noprefixroute enp2s0
       valid_lft forever preferred_lft forever
    inet6 fe80::2a48:7e58:daf5:872d/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever


ip r

default via 192.168.2.5 dev enp2s0 proto static metric 100 
192.168.2.0/24 dev enp2s0 proto kernel scope link src 192.168.2.111 metric 100
```


The current ethernet interface is `enp2s0` and the gateway that is used is `192.168.2.5`.


Alternatively, you can also run the following to find your active network interface:


```bash
nmcli connection show

NAME    UUID                                  TYPE      DEVICE 
enp2s0  280ed14d-7c8b-4586-853d-420df9f65412  ethernet  enp2s0
```


To edit the interface run:


```bash
nmtui-edit enp2s0
```


Make your changes and then restart your network interface:


```bash
ifdown enp2s0 && ifup enp2s0
```

Verify the changes you made, e.g. setting a different gateway:


```bash
ip r

default via 192.168.2.1 dev enp2s0 proto static metric 100 
192.168.2.0/24 dev enp2s0 proto kernel scope link src 192.168.2.111 metric 100
```




