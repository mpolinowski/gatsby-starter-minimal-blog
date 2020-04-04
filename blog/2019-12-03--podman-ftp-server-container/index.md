---
date: "2019-12-03"
title: "Podman FTP Server Container"
categories:
  - LINUX
  - Smarthome
  - IoT
  - Docker

---

![Victory Harbour, Hong Kong](./photo-kt443t6d_64hdh43hfh6dgjdfhg4_d.jpg)



<!-- TOC -->

- [Building the Docker Image](#building-the-docker-image)
- [Using the Docker Image](#using-the-docker-image)

<!-- /TOC -->


## Building the Docker Image


* Create the `Dockerfile`


```dockerfile
# Dockerfile for vsftpd on CentOS7
FROM centos:7

MAINTAINER m.polinowski@gmail.com

RUN yum -y update; yum -y install which vsftpd net-tools vsftpd-sysvinit; yum clean all

COPY vusers.txt /etc/vsftpd/
RUN db_load -T -t hash -f /etc/vsftpd/vusers.txt /etc/vsftpd/vsftpd-virtual-user.db; rm -v /etc/vsftpd/vusers.txt; \ 
	chmod 600 /etc/vsftpd/vsftpd-virtual-user.db
COPY vsftpd.conf /etc/vsftpd/
COPY vsftpd.virtual /etc/pam.d/
RUN mkdir -p /home/vftp/ftpuser; chown -R ftp:ftp /home/vftp

EXPOSE 20 21

CMD ["/usr/sbin/vsftpd","-obackground=NO"]
```


We need to create three files before building the image, one for vsftpd virtual users PAM, another vsftpd.conf file and another with the virtual users:


* `vsftpd.conf` - Server Configuration


```conf
anonymous_enable=NO
local_enable=YES
virtual_use_local_privs=YES
write_enable=YES
local_umask=022
pam_service_name=vsftpd.virtual
guest_enable=YES
user_sub_token=$USER
local_root=/home/vftp/$USER
chroot_local_user=YES
allow_writeable_chroot=YES
hide_ids=YES
xferlog_enable=YES
xferlog_file=/var/log/vsftpd.log
```


* `vsftpd.virtual` - User Configuration


```bash
#%PAM-1.0
auth       required     pam_userdb.so db=/etc/vsftpd/vsftpd-virtual-user
account    required     pam_userdb.so db=/etc/vsftpd/vsftpd-virtual-user
session    required     pam_loginuid.so
```


* `vusers.txt` - User Login


```bash
ftpuser
mypassword
```


With those 4 files in place run the following command from the same directory:


```bash
podman build -t centos-vsftpd .

Sending build context to Docker daemon  5.632kB
Step 1/10 : FROM centos:7
7: Pulling from library/centos
ab5ef0e58194: Already exists Digest: sha256:4a701376d03f6b39b8c2a8f4a8e499441b0d567f9ab9d58e4991de4472fb813c
Status: Downloaded newer image for centos:7
 ---> 5e35e350aded
Step 2/10 : MAINTAINER m.polinowski@gmail.com
 ---> Running in 1c61a249529e
Removing intermediate container 1c61a249529e
 ---> 36e28ef538a6
Step 3/10 : RUN yum -y update; yum -y install which vsftpd net-tools vsftpd-sysvinit; yum clean all
 ---> Running in ae775834a509
Loaded plugins: fastestmirror, ovl
Determining fastest mirrors
 * base: ftp.jaist.ac.jp
 * extras: ftp.jaist.ac.jp
 * updates: ftp.jaist.ac.jp
Resolving Dependencies
--> Running transaction check

...

Successfully built 76812707f80e
Successfully tagged centos-vsftpd:latest
```


## Using the Docker Image

We can transfer this image to an offline machine by exporting it:


```bash
podman save -o centos-vsftpd.docker centos-vsftpd:latest
```


Copy the exported centos-vsftpd.docker file to your offline PC and import it:


```bash
podman load -i centos-vsftpd.docker

Getting image source signatures
Copying blob 1f3e340aabdd done
Copying blob b6845f432261 done
Copying blob d83f2fa44778 done
Copying blob 77b174a6a187 done
Copying blob d0419636bcc7 done
Copying blob e5dd2d926baa done
Copying blob 9721a5c27b58 done
Copying config 76812707f8 done
Writing manifest to image destination
Storing signatures
Loaded image(s): localhost/centos-vsftpd:latest
```


Make sure that the FTP user directory exists and can be written to by your podman user:


```bash
mkdir /opt/vsftpd
mkdir /opt/vsftpd/ftpuser
chmod 775  /opt/vsftpd/*
```


And run the container with:


```bash
podman images

REPOSITORY                               TAG               IMAGE ID       CREATED        SIZE
localhost/centos-vsftpd                  latest            76812707f80e   2 hours ago    307 MB
```


```
podman run \
        --name vsftpd \
        --net=host \
        --privileged \
        --rm \
        -v /opt/vsftpd/ftpuser/:/home/vftp/ftpuser/ \
        localhost/centos-vsftpd
```

![Podman FTP Server Container](./vsftpd_in_Docker_01.png)



