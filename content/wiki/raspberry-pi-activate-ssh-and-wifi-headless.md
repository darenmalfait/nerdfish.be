---
title: Activating SSH and adding Wi-fi to your raspberry pi (headless)
date: 2022-03-07
description: Guidline how to deploy an app with a postgress db to fly.io
tags:
  - raspberry pi
  - ssh
---
# Activating SSH and adding Wi-fi to your raspberry pi (headless)

Connect your microSD card to a computer. Navigate to the boot folder.

## SSH
Create a file with the name ssh. The file does not need any content.

## WiFi
Create a file with the name `wpa_supplicant.conf`. Add the content below to the file:

```bash
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=BE

network={
	ssid="ssid"
	psk="password"
}
```

Now you can boot your Raspberry Pi. It will enable SSH and your Raspberry Pi will connect to the given wireless network.