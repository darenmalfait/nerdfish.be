---
title: Steps I take after a fresh installation of a raspberry pi
date: 2022-03-07
description: Essential configuration of my raspberry pi's
tags:
  - raspberry pi
---

# My raspberry pi fresh installation

## SSH

There are two options to do this. The first you need to do in advance and can be found on [the respective wiki page](https://daren.be/wiki/raspberry-pi-activate-ssh-and-wifi-headless).

The other will be handled when it comes to it.

## Static IP Configuration
Always create a backup of your current network settings. If something were to go wrong, at least you can go back to the previous settings.

```sh
sudo cp /etc/dhcpcd.conf /etc/dhcpcd.conf.backup
```

### Setting a static IP address
The IP configuration of the network adapters are saved in the configuration file `dhcpcd.conf` in the `/etc` folder. Open the file with the nano editor:

```sh
sudo nano /etc/dhcpcd.conf
```

At the bottom of the file add the following lines:

```sh
interface eth0
 static ip_address=192.168.1.30/24
 static routers=192.168.0.1
 static domain_name_servers=9.9.9.9
```

**interface:** use eth0 for the ethernet adapter and wlon0 for the wireless WIFI adapter.
**static ip_address**: Fill in the IP address you would like, followed by a `/` en the subnet mask of your network. If you use 255.255.255.0, then you fill in `/24`. If you have a broader subnet mask like 255.255.0.0, you can use /16.
**static routers**: Fill in the router's IP address (default gateway).
**static domain_name_servers**: Here, you can fill in which DNS servers you want to use.

Once you have changed the file, save the adjustments with `ctrl + X`, `y`, `enter`.

The changes will not be visible immediately. You're probably better of restarting your raspberry pi at this point.

```sh
sudo reboot -h 0
```

After the restart, the raspberry pi can be found on the IP address you have configured.

## Enabel SSH using the GUI
Things get much faster and easier when you have a monitor and peripherals connected to your Raspberry Pi. If you are used to configuring your device using a GUI, follow the steps below.

Once your device boots up:

1. Click the **raspberry logo** at the top-left corner.
2. Select **Preferences** > **Raspberry Pi Configuration**.

![raspberry pi configuration preferences](https://res.cloudinary.com/darenmalfait/image/upload/v1646817552/daren-wiki/raspberry-pi-configuration-preferences-gui_lbc8qe.png)

3. Navigate to the **Interfaces** tab in the configuration window.
4. **Enable SSH** in the second line.

![raspberry pi configuration interface](https://res.cloudinary.com/darenmalfait/image/upload/v1646817552/daren-wiki/raspberry-pi-configuration-interaface-gui_lmnpxx.png)

5. Click **OK** to save the changes.

That’s it. Your Raspberry Pi is now accessible via SSH. Make sure the device is connected to the internet before trying to establish an SSH session.