---
seo:
  title: Check OG Data via cli
  description: Using a cli tool to check open graph data
title: Check Open Graph (OG) data through cli
excerpt: |
  Check OG data via a simple CLI tool written in Go that fetches OpenGraph data from a given URL
date: 2023-12-18T23:00:00.000Z
tags:
  - webdevelopment
  - cli
  - seo
---

Original documentation:
[https://github.com/almonk/ogpk](https://github.com/almonk/ogpk)

## Install

```bash
brew tap almonk/ogpk
brew install ogpk
```

## Usage

If the optional dependency \`timg\` is installed, \`ogpk\` can also display the
\`og\:image\` directly in the terminal.

To fetch OpenGraph data from a website:

```bash
ogpk [URL]
```

To display the `og:image` in the terminal (requires `timg`):

```bash
ogpk [URL] --p
```

Output data as JSON:

```bash
ogpk [URL] --json
```

## Optional Dependency on `timg`

ogpk has an optional dependency on `timg`, a terminal image viewer. If `timg` is
installed and available in the `PATH`, ogpk can display the `og:image` directly
in the terminal when the `--p` flag is used.

To install `timg`, refer to its
[official documentation](https://github.com/hzeller/timg).
