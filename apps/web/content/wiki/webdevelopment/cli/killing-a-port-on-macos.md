---
seo:
  title: killing a port on macos
  description: |
    How do you find what is running on a specific port so you can make it available again?
title: killing a port on macos
tags:
  - webdevelopment
  - cli
excerpt: |
  How do you find what is running on a specific port so you can make it available again?
date: 2022-03-29T22:00:00.000Z
---

You can find out what is running on a specific port by running the command lsof
-i with the port number, :\<PortNumber>.

```bash
sudo lsof -i :<PortNumber>

kill -9 <PID>
```

Or you can kill al processes with the following command:

```bash
killall node
```
