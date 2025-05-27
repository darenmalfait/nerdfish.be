---
seo:
  title: Installing docker on raspberry pi
  description:
    The commands guide you through the installation of docker on your raspberry
    pi
title: Installing docker on raspberry pi
tags:
  - raspberry-pi
excerpt: |
  The commands guide you through the installation of docker on your raspberry pi
date: 2022-11-15T11:00:00.000Z
---

## Step 1: Update and Upgrade

```bash
sudo apt-get update && sudo apt-get upgrade
```

## Step 2: Download the Convenience Script and Install Docker on Raspberry Pi

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

## Step 3: Add a Non-Root User to the Docker Group

```bash
sudo usermod -aG docker Pi
```

## Step 4: Check Docker Version and Info

```bash
docker version
```

## Upgrade Docker?

```bash
sudo apt-get upgrade
```
