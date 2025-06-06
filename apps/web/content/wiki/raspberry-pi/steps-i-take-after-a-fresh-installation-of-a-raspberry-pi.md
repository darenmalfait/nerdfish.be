---
seo:
  title: Steps I take after a fresh installation of a raspberry pi
  description: |
    Essential configuration of my raspberry pi's
title: Steps I take after a fresh installation of a raspberry pi
tags:
  - raspberry-pi
excerpt: |
  Essential configuration of my raspberry pi's
date: 2021-09-14T22:00:00.000Z
---

## My raspberry pi fresh installation

### SSH

There are two options to do this. You can find the first way on
[the respective wiki page](https://www.nerdfish.be/wiki/raspberry-pi-activate-ssh-and-wifi-headless).
We will handle the second way when we come to it.

### Static IP Configuration

Always create a backup of your current network settings. Then, if something were
to go wrong, at least you can go back to the previous settings.

```
sudo cp /etc/dhcpcd.conf /etc/dhcpcd.conf.backup
```

### Setting a static IP address

The IP configuration of the network adapters is saved in the configuration file
dhcpcd.conf in the /etc folder. Open the file with the nano editor:

```
sudo nano /etc/dhcpcd.conf
```

At the bottom of the file, add the following lines:

```
interface eth0
 static ip_address=192.168.1.30/24
 static routers=192.168.0.1
 static domain_name_servers=9.9.9.9
```

- Interface: use eth0 for the ethernet adapter and wlon0 for the wireless WIFI
  adapter.
- static ip_address: Fill in the IP address you would like, followed by a \`/\`
  en the subnet mask of your network. If you use 255.255.255.0, then you fill in
  \`/24\`. If you have a broader subnet mask like 255.255.0.0, you can use /16.
- static routers: Fill in the router's IP address (default gateway).
- static domain_name_servers: Here, you can fill in which DNS servers you want
  to use.

Once you have changed the file, save the adjustments with Ctrl + X, y,
enter\`.The changes will not be visible immediately. So you're probably better
of restarting your raspberry pi at this point.

```
sudo reboot -h 0
```

After the restart, you can find the raspberry pi on the IP address you have
configured.

## Enable SSH using the GUI

- Click the raspberry logo at the top-left corner.&#x20;

* Click the raspberry logo in the top-left corner.&#x20;

- Select Preferences > Raspberry Pi Configuration.

![raspberry pi configuration preferences](/uploads/wiki/steps-i-take-after-a-fresh-installation-of-a-raspberry-pi/raspberry-pi-configuration-preferences-gui_lbc8qe.png)

- Navigate to the Interfaces tab in the configuration window.
- Enable SSH in the second line.

![raspberry pi configuration interface](/uploads/wiki/steps-i-take-after-a-fresh-installation-of-a-raspberry-pi/raspberry-pi-configuration-interaface-gui_lmnpxx.png)

- Click ok to save the changes.

That's it. Your Raspberry Pi is now accessible via SSH. Ensure the device is
connected to the internet before establishing an SSH session.
