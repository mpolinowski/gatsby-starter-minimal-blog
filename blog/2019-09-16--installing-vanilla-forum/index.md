---
date: "2019-09-16"
title: "Vanilla Forums Installation on Debian"
categories:
  - LINUX

---

![Katmandu, Nepal](./photo-kt456d_645dhfh6dgjkhg4_d.jpg)

<!-- TOC -->

- [Prerequisites](#prerequisites)
- [NGINX](#nginx)
  - [Sample Configurations](#sample-configurations)

<!-- /TOC -->


## Prerequisites 

It is strongly recommended to set up the following environment on your server:

* PHP 7.3 or higher.
* MySQL 5.7 or higher (or MariaDB equivalent).
* SSL encryption (check out LetsEncrypt).


## NGINX

The most important consideration to getting Vanilla running on nginx is to make sure the rewrite rules are correct. Below is one suggested configuration which locks down the server to only respond to requests via `index.php`, which we strongly recommend if Vanilla is the only application running.

Make sure that you set the `fastcgi_param` named `X_REWRITE` to `1`.

Make sure that `fastcgi_pass` is set to the name of your actual upstream (in our example below, it’s named `php-fpm`), or call your PHP install directly by socket, for example: `unix:/run/php/php7.3-fpm.sock`.

Make sure that you define `PATH_INFO` in your `fastcgi_param` file. You may find this example set of [FastCGI params helpful](https://www.nginx.com/resources/wiki/start/topics/examples/phpfcgi/).

When configuring FastCGI, using `$realpath_root` instead of `$document_root` may be necessary in some setups (e.g. when using symlinks).

We define `SCRIPT_NAME` and `SCRIPT_FILENAME` explicitly because some configurations may redundantly re-add them during the rewrite, resulting in a name of `/index.php/index.php`. The end result of this is all your Javascript and CSS assets paths in the page start with `/index.php`, thus breaking them. Feel free to omit those two lines if you’re confident your configuration is immune.


### Sample Configurations

This would go within the appropriate `server { }` block. It assumes you’ve already assigned a `root` and `index`, among other things:


```conf
    # Block some folders as an extra hardening measure.
    location ~* /\.git { deny all; return 403; }
    location /build/ { deny all; return 403; }
    location /cache/ { deny all; return 403; }
    location /cgi-bin/ { deny all; return 403; }
    location /uploads/import/ { deny all; return 403; }
    location /conf/ { deny all; return 403; }
    location /tests/ { deny all; return 403; }
    location /vendor/ { deny all; return 403; }

    # This handles all the main requests thru index.php.
    location ~* ^/index\.php(/|$) {
        # send to fastcgi
        include fastcgi.conf;
        fastcgi_param SCRIPT_NAME /index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root/index.php;
        fastcgi_param X_REWRITE 1;
        fastcgi_pass php-fpm; # where 'php-fpm' is the upstream, probably defined in nginx.conf 
    }

    # If this is some other PHP script, disallow it by redirecting to /index.php
    location ~* \.php(/|$) {
        rewrite ^ /index.php$uri last;
    }

    # Default path handling
    location / {
        try_files $uri @vanilla;
    }
    
    location @vanilla {
        rewrite ^ /index.php$uri last;
    }
```