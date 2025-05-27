---
seo:
  title: fix monorepo eslint issues vscode
  description: |
    config to fix eslint issues when having a monorepo in vscode
title: fix monorepo eslint issues vscode
tags:
  - webdevelopment
excerpt: |
  config to fix eslint issues when having a monorepo in vscode
date: 2022-10-05T22:00:00.000Z
---

From Visual Studio Code:

1. CMD + Shift + P
2. Start to type Workspace settings
3. Search for ESlint extension and look for Working Directories and select
   **Edit in settings.json**
4. Enter the paths that need ESlint enabled

```json
{ "eslint.workingDirectories": ["folder-name", "other-foldername"] }
```
