---
date: "Salt Mine & Orchestrate"
title: "Salt Pillars"
categories:
  - LINUX

---

![Guangzhou, China](./photo-kt443t6d_64hdh43hfh6dgjdfhg4_d.jpg)


<!-- TOC -->

- [Complex State Trees](#complex-state-trees)
    - [Execution Order](#execution-order)
    - [Requisites](#requisites)
    - [Watch](#watch)

<!-- /TOC -->


## Complex State Trees

You can combine `*.sls` files by using import statements or by the use of __Top Files__. We can use this data for example in our Apache landing page (see previous tutorial):


__welcome.sls__

```yaml
# Adding a blank front page

include:
  - apache

{% set name = salt.pillar.get('name') %}

check_pillar_values:
  test.check_pillar:
    - present:
      - name
    - failhard: True

welcome_page:
  file.managed:
    - name: /var/www/html/index.html
    - contents: |
        <!doctype html>
        <body>
            <h1>{{ name }}.</h1>
        </body>
```


The include statement on top will add the Apache installation - we can now execute the `welcome.sls` directly and get the complete Apache setup:

```bash
sudo salt ubuntuAsus state.sls apache.welcome
```


You can accomplish the same by creating a `/srv/salt/top.sls` file:

```yaml
base:
  '*':
    - apache
    - apache.welcome
```

The Apache setup can now be executed by running:


```bash
sudo salt '*' state.highstate
```

The `state.highstate` command will setup the whole infrastructure as defined inside your top file. If you create multiple top files for different setup use the [state.top](https://docs.saltstack.com/en/master/ref/modules/all/salt.modules.state.html) command and specify the file you want to execute:


```bash
sudo salt '*' state.top prod_top.sls
```


### Execution Order

Salt's YAML render picks up every instruction inside an `*.sls` file and assigns an order key to them. This makes sure that they are executed in the same order they are written down inside your file. If you need to make sure that one of the instruction is __ALWAYS__ either executed __FIRST__ or __LAST__, you can specify this inside your file:


__init.sls__

```yaml
# Install vanilla Apache on Debian/RedHat

{% from "apache/map.sls" import apache with context %}

install_apache:
  pkg.installed:
   - name: {{ apache.pkg }}
   - order: last

enable_apache:
  service.running:
    - name: {{ apache.srv }}

    # Will be enabled automatically on Debian but has to be enabled manually on RedHat
    - enable: True
    - order: first
```


This order stops working reliably once you have include or require statements inside your file.


### Requisites

Requisites bring explicit ordering to your file execution:


__init.sls__

```yaml
# Install vanilla Apache on Debian/RedHat

{% from "apache/map.sls" import apache with context %}

install_apache:
  pkg.installed:
   - name: {{ apache.pkg }}

enable_apache:
  service.running:
    - name: {{ apache.srv }}

    # Will be enabled automatically on Debian but has to be enabled manually on RedHat
    - enable: True
    - require:
      - pkg: install_apache
```

The `require` statement makes sure that Apache is installed before it will attempt to enable the Apache service.


### Watch

The watch module reacts to a specified instruction being executed and then triggers another function. A practical use case is to restart the Apache service once the Apache configuration was modified:


__init.sls__

```yaml
# Install vanilla Apache on Debian/RedHat

{% from "apache/map.sls" import apache with context %}

install_apache:
  pkg.installed:
   - name: {{ apache.pkg }}

enable_apache:
  service.running:
    - name: {{ apache.srv }}

    # Will be enabled automatically on Debian but has to be enabled manually on RedHat
    - enable: True
    - watch:
      - file: danger_config
    
danger_config:
  file.managed:
    - name /bar/foo
    - contents: foo
    
```


We can also extend the watch service to another SLS file:


__mods.sls__

```yaml
include:
  - apache

extend:
  start_apache:
    service:
      - watch:
        - file: danger_config

{% for conf in ['status', 'info'] %}

mod_{{ conf }}:
  file.managed:
    - name: /etc/apache2/conf-available/mod_{{ conf }}.conf
    - contents: |
        <Location "/{{ conf }}">
            SetHandler server-{{ conf }}
        </Location>

  {% if salt.grains.get('os_family') == 'Debian' %}
  cmd.run:
    - name: a2enmod {{ conf }} && a2enconf mod_{{ conf }}
    - creates: /etc/apache2/conf-enabled/mod_{{ conf }}.conf
  {% endif %}

{% endfor %}
```


The `mods.sls` configures Apache - by including the `init.sls` file we can now execute mods and be certain that Apache will be installed first before the configuration is attempted. We can now define the watch task here instead of the init file.


We can also use the  `watch_in` statement:


__mods.sls__

```yaml
include:
  - apache

{% for conf in ['status', 'info'] %}

mod_{{ conf }}:
  file.managed:
    - name: /etc/apache2/conf-available/mod_{{ conf }}.conf
    - contents: |
        <Location "/{{ conf }}">
            SetHandler server-{{ conf }}
        </Location>
    - watch_in:
      - service: enable_apache

  {% if salt.grains.get('os_family') == 'Debian' %}
  cmd.run:
    - name: a2enmod {{ conf }} && a2enconf mod_{{ conf }}
    - creates: /etc/apache2/conf-enabled/mod_{{ conf }}.conf
  {% endif %}

{% endfor %}
```


If `mod_status` or `mod_info` is changed -> restart `enable_apache`.


You can test the execution order by doing a dry-run:


```bash
salt '*' state.sls apache.mods test=true

ubuntuAsus:
----------
          ID: install_apache
    Function: pkg.installed
        Name: apache2
      Result: True
     Comment: All specified packages are already installed
     Started: 18:26:02.852277
    Duration: 38.55 ms
     Changes:   
----------
          ID: mod_status
    Function: file.managed
        Name: /etc/apache2/conf-available/mod_status.conf
      Result: None
     Comment: The file /etc/apache2/conf-available/mod_status.conf is set to be changed
              Note: No changes made, actual changes may
              be different due to other states.
     Started: 18:26:02.899635
    Duration: 1.456 ms
     Changes:   
              ----------
              newfile:
                  /etc/apache2/conf-available/mod_status.conf
----------
          ID: mod_info
    Function: file.managed
        Name: /etc/apache2/conf-available/mod_info.conf
      Result: None
     Comment: The file /etc/apache2/conf-available/mod_info.conf is set to be changed
              Note: No changes made, actual changes may
              be different due to other states.
     Started: 18:26:02.901184
    Duration: 1.077 ms
     Changes:   
              ----------
              newfile:
                  /etc/apache2/conf-available/mod_info.conf
----------
          ID: enable_apache
    Function: service.running
        Name: apache2
      Result: None
     Comment: Service is set to be restarted
     Started: 18:26:02.940131
    Duration: 19.022 ms
     Changes:   
----------
          ID: mod_status
    Function: cmd.run
        Name: a2enmod status && a2enconf mod_status
      Result: None
     Comment: Command "a2enmod status && a2enconf mod_status" would have been executed
     Started: 18:26:02.961747
    Duration: 378.228 ms
     Changes:   
----------
          ID: mod_info
    Function: cmd.run
        Name: a2enmod info && a2enconf mod_info
      Result: None
     Comment: Command "a2enmod info && a2enconf mod_info" would have been executed
     Started: 18:26:03.340098
    Duration: 4.92 ms
     Changes:   

Summary for ubuntuAsus
------------
Succeeded: 6 (unchanged=5, changed=2)
Failed:    0
------------
Total states run:     6
Total run time: 443.253 ms
```