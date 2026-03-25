---
seo:
  title: search for git message
  description: Git commands to search for a message
title: search for git message
tags:
  - git
  - webdevelopment
excerpt: |
  Git commands to search for a message
date: 2026-03-25T15:49:37.651Z
---

## Search for a message

You used to be able to do this, but GitHub removed this feature at some point
mid-2013. To achieve this locally, you can do:

```bash
git log -g --grep=STRING
```

(Use the -g flag if you want to search other branches and dangling commits.)

```bash
-g, --walk-reflogs
```

Instead of walking the commit ancestry chain, walk reflog entries from the most
recent one to older ones.
