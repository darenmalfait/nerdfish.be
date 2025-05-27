---
seo:
  title: setting up ssh keys for github and bitbucket
  description: |
    Commands to create specific ssh keys for multiple hosts
title: setting up ssh keys for github and bitbucket
tags:
  - git
  - webdevelopment
excerpt: |
  Commands to create specific ssh keys for multiple hosts
date: 2022-05-25T22:00:00.000Z
---

## Generating a new SSH key for GitHub

## Basic ssh key adding

Generating a new SSH key for GitHub.

```shell
ssh-keygen -t ed25519 -C "<insert email>" -f ~/.ssh/github
ssh-add -K ~/.ssh/github
```

Paste the following into GitHub:

```shell
pbcopy < ~/.ssh/github.pub
```

Add the SSH key locally.

```shell
ssh -T git@bitbucket.org-clientname
```

If you use a new host or something like \`bitbucket.org-clientname\` as
\`host\`, you need to add it to your ssh.

```shell
ssh -T git@bitbucket.org-clientname
```

### Config file

If there is no config file yet:

```shell
touch ~/.ssh/config
```

Once there is a config file, you can add configurations with the following:

```shell
printf "# Github\n Host github.com\n Hostname github.com\n AddKeysToAgent yes\n UseKeychain yes\n IdentityFile ~/.ssh/github" | tee ~/.ssh/config
```

### Multiple accounts by the same host

Sometimes you have different accounts (work, private, client 1, client 2, ...),
and you want to ensure you commit with the proper credentials.

You can do that, but it requires a bit of work. It works the same way you add a
regular ssh-key, but there are some differences.

```shell
ssh-keygen -t ed25519 -C "<insert email>" -f ~/.ssh/bitbucket-private
ssh-add -K ~/.ssh/bitbucket-private
```

Paste the following into your host (Bitbucket in this example):

```shell
pbcopy < ~/.ssh/bitbucket-private.pub
```

Now is where it gets different. You create an alias. We can add anything we want
behind the hostname. In this example, we add "-private", but it might as well be
"-client-x".

```shell
ssh -T git@bitbucket.org-private
```

In the config, we resolve the hostname.

```shell
printf "# Bitbucket private\n Host bitbucket.org-private\n Hostname bitbucket.org\n AddKeysToAgent yes\n UseKeychain yes\n IdentityFile ~/.ssh/bitbucket-private" | tee ~/.ssh/config
```
