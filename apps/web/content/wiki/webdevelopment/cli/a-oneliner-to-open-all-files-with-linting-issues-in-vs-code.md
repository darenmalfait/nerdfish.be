---
seo:
  title: a oneliner to open all files with linting issues in vs-code
  description:
    This page contains a command using ESLint to lint JavaScript, JSX,
    TypeScript, and TSX files in the current directory. It then filters the
    output only to show the files that contain a specified string and opens them
    in Visual Studio Code.
  seoImg: ''
title: a oneliner to open all files with linting issues in vs-code
tags:
  - webdevelopment
  - cli
  - linting
excerpt: |
  This page contains a command using ESLint to lint JavaScript, JSX, TypeScript, and TSX files in the current directory. It then filters the output only to show the files that contain a specified string and opens them in Visual Studio Code.
date: 2023-01-10T11:00:00.000Z
---

This command uses ESLint to lint JavaScript, JSX, TypeScript, and TSX files in
the current directory. It then filters the output only to show the files that
contain a specified string (in this case, "darenmalfait" because that's a string
all my paths have) and opens them in Visual Studio Code.

```
npx eslint --ext .js,.jsx,.ts,.tsx . | grep darenmalfait | xargs code
```

![a computer with linting errors](/uploads/wiki/a-oneliner-to-open-all-files-with-linting-issues-in-vs-code/Daren_a_scared_computer_with_a_ribbons_around_it_plastic_3d_ren_f2ba46b1-7d12-4144-99b2-8c19461c2b6a_dm7mif.png 'a computer with linting errors')

## Explaining the command in more detail:

This command uses several command line tools to perform several actions:

1. npx eslint: This runs the ESLint command-line tool using npx, a tool for
   executing packages, like ESLint, in a project. The --ext flag is used to
   specify file extensions that should be linted. In this case, it's linting
   files with the extensions .js, .jsx, .ts, and .tsx. The . at the end
   specifies the current directory.
2. grep darenmalfait: The grep command is used to search for a pattern in a
   given input. In this case, it is searching through the output of the previous
   command (ESLint) for the string "darenmalfait".
3. xargs code : The xargs command is used to build and execute command lines
   from standard input. In this case, it takes the output of the previous
   command (grep), which should be the filename containing the pattern
   'darenmalfait' and use them as an argument for the command 'code'. So this
   last command will open the matched files in vs-code.
