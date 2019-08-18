# Append system config settings, so the ElasticSearch Docker container will work,
# and so Nginx can handle more connections. [BACKLGSZ]

if ! grep -q 'Talkyard' /etc/sysctl.conf; then
  log_message 'Amending the /etc/sysctl.conf config...'
  cat <<-EOF >> /etc/sysctl.conf
		
		###################################################################
		# Talkyard settings
		#
		vm.swappiness=1            # turn off swap, default = 60
		net.core.somaxconn=8192    # Up the max backlog queue size (num connections per port), default = 128. Sync with conf/web/server-listen-http(s).conf.
		vm.max_map_count=262144    # ElasticSearch wants this, default = 65530
		                           # See: https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html
		EOF

  log_message 'Reloading the system config...'
  sysctl --system
fi


# Make Redis happier:
# Redis doesn't want Transparent Huge Pages (THP) enabled, because that creates
# latency and memory usage issues with Redis. Disable THP now directly, and also
# after restart: (as recommended by Redis)
echo 'Disabling Transparent Huge Pages (for Redis)...'
echo never > /sys/kernel/mm/transparent_hugepage/enabled
if ! grep -q 'transparent_hugepage/enabled' /etc/rc.local; then
  echo 'Disabling Transparent Huge Pages after reboot, in /etc/rc.local...'
  # Insert ('i') before the last line ('$') in rc.local, which always? is
  # 'exit 0' in a new Ubuntu installation.
  sed -i -e '$i # For Talkyard and the Redis Docker container:\necho never > /sys/kernel/mm/transparent_hugepage/enabled\n' /etc/rc.local
fi



# Simplify troubleshooting:
if ! grep -q 'HISTTIMEFORMAT' ~/.bashrc; then
  log_message 'Adding history settings to .bashrc...'
  cat <<-EOF >> ~/.bashrc
		
		###################################################################
		export HISTCONTROL=ignoredups
		export HISTCONTROL=ignoreboth
		export HISTSIZE=10100
		export HISTFILESIZE=10100
		export HISTTIMEFORMAT='%F %T %z  '
		EOF
fi