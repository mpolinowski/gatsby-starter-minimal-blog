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