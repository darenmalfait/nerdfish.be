---
seo:
  title: installing uptime kuma status checks on docker
  description: Uptime Kuma is a self-hosted monitoring tool like "Uptime Robot".
title: installing uptime kuma status checks on docker
tags:
  - raspberry-pi
excerpt: |
  Uptime Kuma is a self-hosted monitoring tool like "Uptime Robot".
date: 2022-11-15T11:00:00.000Z
---

Uptime Kuma is a self-hosted monitoring tool like "Uptime Robot". Installing it
on a raspberry pi can easily be done by installing it using docker.

![uptime kuma](/uploads/wiki/installing-uptime-kuma-status-checks-on-docker/68747470733a2f2f757074696d652e6b756d612e7065742f696d672f6461726b2e6a7067_rgm89c.jpg 'uptime kuma')

## Create a volume

```bash
docker volume create uptime-kuma
```

## Start the container

```bash
docker run -d --restart=always -p 3001:3001 -v uptime-kuma:/app/data --name uptime-kuma louislam/uptime-kuma:1
```

Browse to [http://localhost:3001](http://localhost:3001/) after starting.
