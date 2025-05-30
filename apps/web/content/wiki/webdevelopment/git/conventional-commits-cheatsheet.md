---
seo:
  title: conventional commits cheatsheet
  description:
    'This cheatsheet helps you understand the Conventional Commit format,
    providing examples and guidelines for writing clear commit messages. With
    fun food-themed examples like feat: add gluten-free pizza option, it covers
    everything from feature additions to bug fixes and refactoring. Perfect for
    keeping your Git history organized.'
title: conventional commits cheatsheet
tags:
  - git
  - webdevelopment
excerpt: |
  This cheatsheet helps you understand the Conventional Commit format, providing examples and guidelines for writing clear commit messages. With fun food-themed examples like feat: add gluten-free pizza option, it covers everything from feature additions to bug fixes and refactoring. Perfect for keeping your Git history organized.
date: 2024-10-22T14:57:32.529Z
---

## Commit Message Formats

### Standard Format

```
<type>(<optional scope>): <description>
empty separator line
<optional body>
empty separator line
<optional footer>
```

### Initial Commit

```
chore: initial commit
```

### Types

API relevant changes:

- feat: Commits that add or remove a new feature.
- fix: Commits that fix a bug.
- refactor: Commits that restructure or rewrite code without changing behavior.
- perf: Special refactor commits that improve performance.
- style: Commits that do not affect functionality (e.g., whitespace, formatting,
  missing semi-colons).
- test: Commits that add missing tests or correct existing tests.
- docs: Commits that affect documentation only.
- build: Commits that impact build components such as build tools, CI pipelines,
  dependencies, versioning.
- ops: Commits that affect operational components like infrastructure,
  deployment, backups, recovery.
- chore: Miscellaneous commits, like updating .gitignore.

### Scopes

The scope provides additional context.

- Is an optional part of the format.
- Allowed scopes depend on the project.
- Avoid using issue identifiers as scopes.

### Breaking Changes Indicator

Indicate breaking changes with an ! before the : in the subject line, e.g.,
feat(api)!: remove status endpoint.

- Is an optional part of the format.

### Description

The description is a concise summary of the change.

- Is a mandatory part of the format.
- Use the imperative, present tense: "change" not "changed" or "changes."
- Think of This commit will... or This commit should....
- Don't capitalize the first letter.
- No period (.) at the end.
- Can include ticket numbers, e.g., feat(app): 123 add user profile

### Body

The body explains the motivation for the change and how it contrasts with
previous behavior.

- Is an optional part of the format.
- Use the imperative, present tense: "change" not "changed" or "changes."
- This is where issue identifiers and references should be mentioned.

### Footer

The footer includes any Breaking Changes information and references issues.

- Is an optional part of the format.
- Optionally reference an issue by its ID.
- Breaking Changes must start with BREAKING CHANGES: followed by a space or two
  newlines, with details in the rest of the message.

## Examples

```
feat: add gluten - free pizza option to the menu
```

```
feat(menu): add "add extra toppings" button for salads
```

```
feat!: remove tomato soup from the specials menu

refers to JIRA-1337

BREAKING CHANGES: tomato soup has been removed from the menu.
```

```
feat: JIRA-1337 add tomato soup to the specials menu
```

```
style: remove extra spaces in the recipe instructions
```

## Tools

### Better Commits CLI

The [Better Commits CLI](https://github.com/Everduin94/better-commits) helps you
create conventional commits through a series of prompts. Key features:

- Generate conventional commits through interactive prompts
- Infers ticket numbers and commit types from branch names
- Consistent branch creation with flexible workflow hooks
- Interactive git status/add on commit
- Preview commit messages in color
- Support for git emojis per commit type
- Configure globally or per repository

Install:

```bash
npm install -g better-commits
```

Use:

```bash
better-commits
# or
npx better-commits
```

## References

- [https://www.conventionalcommits.org/](https://www.conventionalcommits.org/)
