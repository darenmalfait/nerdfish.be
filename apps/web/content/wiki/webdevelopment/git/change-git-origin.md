---
seo:
  title: Change git origin
  description:
    Commands to change the git remote origin URL for your repository using git
    commands or by editing the config file directly.
title: Change git origin
tags:
  - git
  - webdevelopment
excerpt:
  Commands to change the git remote origin URL for your repository using git
  commands or by editing the config file directly.

date: 2025-09-02T11:49:37.651Z
---

## Change origin

First, view the existing remotes to verify which URL is currently set:

```bash
git remote -v
```

Then, you can set it with:

```bash
git remote set-url origin <NEW_GIT_URL_HERE>
```

See [git help remote](https://git-scm.com/docs/git-remote). You also can edit
.git/config and change the URLs there.
