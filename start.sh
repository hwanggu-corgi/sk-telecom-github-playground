#!/usr/bin/env bash

function set_launchctl_maxfiles {
  local current_maxfiles_soft_limit=$(launchctl limit maxfiles | awk '{print $2}');
  local current_maxfiles_hard_limit=$(launchctl limit maxfiles | awk '{print $3}');

  local new_maxfiles_soft_limit=$([ "$current_maxfiles_soft_limit" < 65535 ] && echo "65535" ||  echo "$current_maxfiles_soft_limit");
  local new_maxfiles_hard_limit=$([ "$current_maxfiles_hard_limit" < 200000 ] && echo "200000" ||  echo "$current_maxfiles_soft_limit");

  echo $new_maxfiles_soft_limit;
  echo $new_maxfiles_hard_limit;
  echo "hello";

  sudo launchctl limit maxfiles 65535 200000;
}

function set_ulimit {
  local ulimit_amount=$(ulimit | awk '{print $1}');

  ulimit -n 65535;
}

function set_sysctl_kern_maxfiles {
  local sysctl_kern_maxfiles=$(sysctl kern.maxfiles | awk '{print $2}');

  sudo sysctl -w kern.maxfiles=100000;
}

function set_sysctl_kern_maxfilesperproc {
  local sysctl_kern_maxfilesperproc=$(sysctl kern.maxfiles | awk '{print $2}');

  sudo sysctl -w kern.maxfilesperproc=65535;
}

if [[ "$OSTYPE" =~ ^darwin ]]; then
  set_launchctl_maxfiles;
  set_ulimit;
  set_sysctl_kern_maxfiles;
  set_sysctl_kern_maxfilesperproc;
fi

hugo server;