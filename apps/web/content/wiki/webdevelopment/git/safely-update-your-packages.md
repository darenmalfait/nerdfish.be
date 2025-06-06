---
seo:
  title: Safely update your packages
  description: |
    Updating packages is essential to get the latest features and reduce security issues. npm-check-updates is an npm package that makes the process of updating packages easier. This post shows what's my flow of updating packages.
title: Safely update your packages
tags:
  - webdevelopment
  - git
excerpt: |
  Updating packages is essential to get the latest features and reduce security issues. npm-check-updates is an npm package that makes the process of updating packages easier. This post shows what's my flow of updating packages.
date: 2022-03-21T23:00:00.000Z
---

Updating packages is essential to get the latest features and reduce security
issues. npm-check-updates is an npm package that makes the process of updating
packages easier. Here's my flow of how I update packages.

## Install npm-check-updates

If you don't want to install the package globally, you can run it with npx.

```bash
npm install -g npm-check-updates
```

## What does it do?

When you run the command below, you will get an overview of all packages that
have updates available.&#x20;

```bash
npx npm-check-updates
```

## Safely updating packages

We will be updating packages in turns. First, we update the least impactful,
followed by minor versions and last but not least, the packages that have
breaking changes.Before moving to the next step, we run npm i, checking if
something breaks.

### Patches

```bash
npx npm-check-updates -u -t patch
```

#### Monorepo

```bash
npx npm-check-updates -u -t patch --deep
```

### Minor versions

```bash
npx npm-check-updates -u -t minor
```

#### Monorepo

```bash
npx npm-check-updates -u -t minor --deep
```

## Major versions

A change in major versions usually indicates that there are breaking changes. So
look up the package and go and check the release notes. Once you do, you have
two options. You could update all the major versions with `npx ncu -u -t major`,
but it's better to update them one by one.

```bash
npx npm-check-updates -u -f eslint
```

The param `-f` or `--filter` lets you filter the packages you want to update.
After that, you can proceed to the next major package that needs an update.
