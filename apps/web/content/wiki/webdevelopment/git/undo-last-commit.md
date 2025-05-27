---
title: undo your last git commit
tags:
  - webdevelopment
  - git
  - cli
excerpt: |
  quick commands on how to reset to the previous commit
date: 2022-11-06T23:00:00.000Z
seo:
  title: undo last commit
  description: quick commands on how to reset to the previous commit
---

## Soft reset

You can preserve the changes you want to undo using the soft flag. You'll find
the changes as uncommitted local modifications in your working copy.

```shell
git reset --soft HEAD~1
```

If you don't want to keep these changes, use the --hard flag. Be sure to do this
when you're sure you don't need these changes anymore.

With a soft reset, you can remove the files you didn't want to commit and
recommit with the same message:

```shell
git restore --staged path/to/unwanted-file
```

```shell
git commit -c ORIG_HEAD
```

## Hard reset

```shell
git reset --hard HEAD~1
```

The HEAD~1 argument tells git to move the HEAD pointer to the commit before the
current commit. Essentially, it's a shorthand for "the commit before the commit
that HEAD currently points to".

The difference between the two commands is in how they handle changes in the
working directory and the index (also known as the "staging area").

`git reset --soft HEAD~1` Will move the HEAD pointer to the previous commit,
leaving the changes in the working directory and the index intact. This means
that any changes you have made to your code since the last commit will still be
there, you can continue to make additional changes or create a new commit to
include them.

`git reset --hard HEAD~1` Will also move the HEAD pointer to the previous commit
and discard any changes in the working directory and the index. This means any
changes made to your code since the last commit will be lost, and your working
directory will be the same as in the previous commit.

It's essential to be very careful when using git reset --hard because it
discards changes permanently, and you can't get it back unless you have a backup
or version.

So, `git reset --soft` allows you to undo a commit but keep all the changes
while `git reset --hard` will undo the commit and discard all the changes.

## Oops, I didn't mean to

![computer panicking](/uploads/wiki/undo-last-commit/hero.png 'computer panicking')

If you reset a bit too much, you can redo the last step using the following:

```shell
git reset 'HEAD@{1}'
```

This command also uses the git reset command to move the current branch's HEAD
(the pointer that refers to the current commit) to a different commit.

`HEAD@{1}` is a notation that refers to the commit to which the HEAD pointer was
previously pointing. The `HEAD@{n}` notation is known as a "HEAD reflog",
allowing you to refer to commits that the HEAD pointer has previously pointed
to, even if they are no longer reachable by any branch or tag.

For example, `HEAD@{1}` refers to the commit that HEAD was pointing to before
the current commit and `HEAD@{2}` would refer to the commit that HEAD was
pointing to two commits ago.

When you run the command, git reset `HEAD@{1}` it moves the current branch's
HEAD pointer to the commit it previously pointed to before the current commit.
Like `git reset --hard HEAD~1` it also discards any changes in the working
directory and index. You won't lose data permanently, though, as the changes are
being moved to the reflog and can be retrieved.
