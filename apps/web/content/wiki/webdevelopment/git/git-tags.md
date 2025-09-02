---
seo:
  title: Git Tags Commands
  description:
    Essential git tag commands for creating, managing, and deleting tags in your
    repository including local and remote operations.
title: Git Tags Commands
tags:
  - git
  - webdevelopment
excerpt:
  Essential git tag commands for creating, managing, and deleting tags in your
  repository including local and remote operations.

date: 2025-09-02T11:49:37.651Z
---

## Add tag to latest commit

```bash
git tag -a v[version] -m "your tag description"
```

## Add tag to specific commit

```bash
git tag -a v[version] [hash] -m "your tag description"
```

## Show commits since last tag

```bash
git log $(git describe --tags --abbrev=0)..HEAD --oneline
```

## Delete tag

```bash
# Delete local tag
git tag -d v[version]

# Delete remote tag
git push origin --delete v[version]
```
