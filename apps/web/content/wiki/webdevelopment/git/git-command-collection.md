---
seo:
  title: git command collection
  description: A collection of git commands
title: git command collection
tags:
  - git
  - webdevelopment
excerpt: |
  A collection of git commands
date: 2024-03-08T15:49:37.651Z
---

## Basics

- Avoid merge commits by using rebase.
- Squash multiple trivial commits into a single commit.
- Write
  a [the perfect commit message](https://www.nerdfish.be/blog/2022/02/writing-the-perfect-git-commit-message/)

## Writing a feature

Branch from main

```
git checkout main
git pull
git checkout -b <branch-name>
```

Rebase upstream often to avoid conflicts

```
git fetch origin
git rebase origin/main
```

In case of multiple commits rebase
[interactively](https://help.github.com/articles/about-git-rebase/)

```
git rebase -i origin/main
```

Commit with
[the perfect commit message](https://www.nerdfish.be/blog/2022/02/writing-the-perfect-git-commit-message/)

## Merging branches

Rebase from main

```
git fetch origin
git rebase -i origin/main
```

Force push your branch

```
git push --force-with-lease origin <branch-name>
```

View a list of new commits. View changed files. Merge branch into main.

```
git log origin/main..<branch-name>
git diff --stat origin/main
git checkout main
git merge <branch-name> --ff-only
git push
```

## Tags

### Add tag to latest commit

```bash
git tag -a v[version] -m "your tag description"
```

### Add tag to specific commit

```bash
git tag -a v[version] [hash] -m "your tag description"
```

### Show commits since last tag

```bash
git log $(git describe --tags --abbrev=0)..HEAD --oneline
```

### Delete tag

```bash
# Delete local tag
git tag -d v[version]

# Delete remote tag
git push origin --delete v[version]
```
