# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # 共通の設定
  # boxの設定
  config.vm.box = "bento/centos-6.7"
  config.vm.box_url = "https://github.com/CommanderK5/packer-centos-template/releases/download/0.6.7/vagrant-centos-6.7.box"

  # 共通処理 set ipaddress & set network & update
  common_provision = <<-EOT
    service iptables stop
    chkconfig iptables off
    echo net.ipv6.conf.all.disable_ipv6 = 1 >> /etc/sysctl.conf
    echo net.ipv6.conf.default.disable_ipv6 = 1 >> /etc/sysctl.conf
    /sbin/sysctl -p
    yum update -y
  EOT

  config.vm.define :server do |node|

     # ansible install & run
    provision = <<-EOT
      rpm -ivh http://ftp.riken.jp/Linux/fedora/epel/6/i386/epel-release-6-8.noarch.rpm
      yum -y install ansible libselinux-python
      ansible-playbook /recipe/playbook-server.yml --connection=local -i /recipe/hosts -l server
    EOT

    # set ipaddress & set network
    node.vm.hostname = "server"
    node.vm.network "private_network", ip: "192.168.33.10"

    # set synced folder
    node.vm.synced_folder "sandbox_server", "/vagrant_data", :mount_options => ["dmode=777", "fmode=644"]
    node.vm.synced_folder "recipe", "/recipe", :mount_options => ["dmode=777", "fmode=644"]

    # provisioning
    node.vm.provision :shell, :inline => common_provision
    node.vm.provision :shell, :inline => provision
  end

  config.vm.define :front do |node|

    # ansible install & run
    provision = <<-EOT
      rpm -ivh http://ftp.riken.jp/Linux/fedora/epel/6/i386/epel-release-6-8.noarch.rpm
      yum -y install ansible libselinux-python
      ansible-playbook /recipe/playbook-front.yml --connection=local -i /recipe/hosts -l front
    EOT

    # set ipaddress & set network
    node.vm.hostname = "front"
    node.vm.network "private_network", ip: "192.168.33.11"

    # set synced folder
    node.vm.synced_folder "sandbox_front", "/vagrant_data", :mount_options => ["dmode=777", "fmode=644"]
    node.vm.synced_folder "recipe", "/recipe", :mount_options => ["dmode=777", "fmode=644"]

    # provisioning
    node.vm.provision :shell, :inline => common_provision
    node.vm.provision :shell, :inline => provision
  end
end
