---
seo:
  title: Installing Portainer for Docker
  description: Portainer is a visual interface for Docker.
title: Installing Portainer for Docker
tags:
  - raspberry-pi
excerpt: |
  Portainer is a visual interface for Docker.
date: 2022-11-14T23:00:00.000Z
---

Portainer is a visual interface for Docker.

## Create volume for persistent data

```bash
docker volume create portainer_data
```

## Run Docker

```bash
docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
```

## Update Portainer

```bash
docker pull portainer/portainer
docker stop portainer
docker rm portainer

docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
```
