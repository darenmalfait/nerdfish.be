---
seo:
  title: cleanup lingering git branches
  description:
    When branches are deleted on the remote (origin), your local repository
    won't automatically recognize the change. You'll still have locally cached
    copies of those branches (which can be useful), but running git branch -a
    will continue to display them as if they are still present on the remote.
title: cleanup lingering git branches
tags:
  - git
  - webdevelopment
excerpt: |
  When branches are deleted on the remote (origin), your local repository won't automatically recognize the change. You'll still have locally cached copies of those branches (which can be useful), but running git branch -a will continue to display them as if they are still present on the remote.
date: 2024-10-22T14:34:59.093Z
---

When branches are deleted on the remote (origin), your local repository won't
automatically recognise the change.

You'll still have locally cached copies of those branches (which can be useful),
but running git branch -a will continue to display them as if they are still
present on the remote.

You can clean up outdated branch information in your local repository with the
following command:

```
git remote prune origin
```

This will remove references to branches that no longer exist on the remote
(origin), ensuring that git branch -a no longer lists them as if they still
exist. However, this command only cleans up the references to remote branches;
your local copies of those deleted branches remain intact. So if you had checked
out a branch locally before it was deleted from the remote, that branch will
still exist in your local repository.

Alternatively, the same result can be achieved with:

```
git fetch--prune
```

This command not only fetches new changes from the remote but also prunes
(cleans up) references to any deleted remote branches.

To avoid having to manually prune every time, you can set this behavior as the
default by configuring Git to always prune on fetch:

```
git config--global fetch.prune true
```

With this setting, every time you run git fetch, it will automatically clean up
remote-tracking branches that no longer exist on the origin. This helps keep
your repository up to date and reduces clutter from stale branches without
affecting any local branches you have.
