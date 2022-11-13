<div align="center">
<h1>Daren.be</h1>

<p>Darens personal website</p>
</div>

---

The website is built using NextJS. It uses tina.io to provide data.


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Environment Variables](#environment-variables)
    - [Import environment variables from a file](#import-environment-variables-from-a-file)
- [Run Locally](#run-locally)
- [Semantic Commit Messages](#semantic-commit-messages)
  - [Example](#example)
    - [Commit Types:](#commit-types)
- [Contributing](#contributing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```bash
  npm run install-all
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Run run following in the project folder.

```bash
cp .env.example .env
```

  - `NEXT_PUBLIC_TINA_CLIENT_ID`: These are retrieved from your project at app.tina.io
  - `TINA_TOKEN`: These are retrieved from your project at app.tina.io
  - `NEXT_PUBLIC_TINA_BRANCH` This is set by default CI with Netlify/Vercel/Github, but can be overriden
  - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` found in cloudinary
  - `NEXT_PUBLIC_CLOUDINARY_API_KEY` found in cloudinary
  - `CLOUDINARY_API_SECRET` found in cloudinary
  - `NEXT_PUBLIC_RECAPTCHA_SITEKEY` recaptcha public key
  - `RECAPTCHA_SECRETKEY` recaptcha secret key
  - `SENDGRID_API_KEY` found in sendgrid
  - `NEXT_PUBLIC_ALGOLIA_APP_ID`: found in Algolia app settings
  - `NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY`: found in Algolia app settings
  - `ALGOLIA_ADMIN_KEY`: found in Algolia app settings
  - `NEXT_PUBLIC_ALGOLIA_INDEX_NAME`: found in Algolia app settings

#### Import environment variables from a file
Perhaps you already have your environment variables stored in a local file like a .env file. You can use that as a source to bulk import into Netlify like this:

netlify env:import .env

## Run Locally

Once node_modules are installed, this will run both the app.

```bash
  npm run dev
```

## Semantic Commit Messages

See how a minor change to your commit message style can make you a better programmer.

A better read for this can be found at [one of my blog posts][conventional_commits_blog]

TLDR (please read the article):

Format: `<type>(<scope>): <subject>`

`<scope>` is optional

### Example

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

#### Commit Types:

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)

## Contributing

Contributions are always welcome!

Make a branch with the following name conventions:

`group/{ticket-number}-short-description`

with `group` being the same as [commit types](#commit-types)

[conventional_commits_blog]: https://daren.be/blog/2022/02/writing-the-perfect-git-commit-message