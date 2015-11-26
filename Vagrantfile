# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "centos6.6"

  config.vm.define :server do |node|

    config.vm.network "private_network", ip: "192.168.33.10"
    config.vm.synced_folder "sandbox_server", "/vagrant_data"

    config.vm.provision "ansible" do |ansible|
      ansible.playbook = "recipe/playbook-server.yml"
    end
  end
  
  config.vm.define :front do |node|

    config.vm.network "private_network", ip: "192.168.33.11"
    config.vm.synced_folder "sandbox_front", "/vagrant_data"

    config.vm.provision "ansible" do |ansible|
      ansible.playbook = "recipe/playbook-front.yml"
    end
  end
end
