<div align="center">
<h1>Daren.be</h1>

<p>Darens personal website</p>
</div>

---

The website is built using Remix. It uses Sanity headless CMS to provide data.

[![Deploy][fly-deploy-badge]][fly-deploy-action]
[![Studio Deploy][release-studio-badge]][release-studio-badge]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Run Locally](#run-locally)
  - [Configure Sanity](#configure-sanity)
- [Making changes](#making-changes)
  - [✨ Creating blocks/sections](#-creating-blockssections)
- [Semantic Commit Messages](#semantic-commit-messages)
  - [Example](#example)
    - [Commit Types:](#commit-types)
- [Contributing](#contributing)
- [Google Tag Manager](#google-tag-manager)
- [Deployment](#deployment)
  - [Initial deployment](#initial-deployment)
  - [Continuous deployment](#continuous-deployment)

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
echo ENCRYPTION_KEY=$(openssl rand -hex 32) >> .env
echo SANITY_STUDIO_PREVIEW_SECRET=$(openssl rand -hex 32) >> .env
```

>  If you don't have openssl installed, you can also use [1password][generate_password] to generate a random secret, just replace `$(openssl rand -hex 32)` with the generated secret.
>


  - `SANITY_STUDIO_PROJECT_URL` project url with no trailing slash
  - `SANITY_API_TOKEN` token with read rights - from sanity
  - `ENCRYPTION_KEY` can be anything, used for encrypted cookies
  - `SENDGRID_API_KEY` found in sendgrid
  - `SANITY_STUDIO_PREVIEW_SECRET` can be anything, used to check if sanity is in preview mode. Makes it able to see draft previews from sanity
  - `SANITY_STUDIO_API_DATASET` sanity dataset that is used
  - `SANITY_STUDIO_API_PROJECT_ID` sanity project id
  - `GTM_ID` optional google tag manager id, make sure to enable cookie banner in studio

## Run Locally

### Configure Sanity
If you don't have the [Sanity CLI](https://www.sanity.io/docs/getting-started-with-sanity-cli) installed, install it globally using `npm install -g @sanity/cli`.

1. `sanity init` in the `/studio` folder
2. During Sanity's initalization it will warn you, type `Y` and hit `enter`:
    ```
    ? The current folder contains a configured Sanity studio. Would you like to reconfigure it? (Y/n)
    ```
3. When it asks you what dataset configuration to use, go with `production`.
4. Add CORS Origins to your newly created Sanity project (visit: [manage.sanity.io](https://manage.sanity.io) and go to Settings > API):
    - Add your Studio URLs **_with_** credentials: `http://localhost:3333` and `[subdomain].sanity.studio`
    - Add your front-end URLs **_with_** credentials: `http://localhost:3000` and `https://[subdomain].netlify.app`
5. (optional) In `/` run `npm run import` to import the preset data into the dataset.

> ⚠️ **Important!** <br />In case #6 isn't executed. For "singleton" documents, like settings sections, the schema uses `__experimental_actions`. You will need to comment out the `__experimental_actions` line in "singleton" schemas to publish settings for the first time. This is because a singleton is still a document type, and one needs to exist first before it can be edited. If you create a new singleton document. You need to add it to the list of singletons at `studio/parts/resolve-actions`

Once node_modules are installed and sanity is configured, this will run both the app and the studio.

```bash
  npm run dev
```

## Making changes

### ✨ Creating blocks/sections

Blocks are elements that contain content and have a layout assigned to them. They can be added through the Sanity page builder to a page.

1. To add a blocks simply go to `/generate` and run `npm run create-block` and fill in everything.
2. In `/studio/schemas/blocks/` a new block will be made. Set up the content in the `content` file.
3. In `/app/components/sections/` a new Front-end placeholder is setup to start from.
> ⚠️ **Important!** <br />If you use a PortableText or a reference field inside the schema you will need to add custom queries to `/app/lib/queries` to support the references inside of those fields. Otherwise those fields will never see the light of day.

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

## Google Tag Manager

In `/data` there is a file `gtm.json` which contains a google tag manager container which you can import to start from.

## Deployment

### Initial deployment

Perhaps you already have your environment variables stored in a local file like a .env file. You can use that as a source to bulk import into Fly like this:

> ⚠️ **Important! make sure to fill in fly.toml so it takes the correct project before doing this

`cat .env.production | tr '\n' ' ' | xargs flyctl secrets set`

Set a single secret
`flyctl secrets set [name]=[value]`

Then you can deploy

`flyctl deploy .`

or if you're building locally you can re-use your docker cache

`flyctl deploy --local-only`

### Continuous deployment

If you set the `.env` secrets [into github][github-action-secrets], github actions wil make sure everything gets deployed to the right places.

  - `FLY_API_TOKEN` deploy [token][fly_new_access_token] from fly.io
  - `SANITY_AUTH_TOKEN` deploy token from sanity.io
  - `SANITY_STUDIO_PREVIEW_SECRET` same as production .env
  - `SANITY_STUDIO_PROJECT_URL` same as production .env
  - `SANITY_STUDIO_API_PROJECT_ID` same as production .env
  - `SANITY_STUDIO_API_DATASET` same as production .env


[fly-deploy-badge]: https://github.com/darenmalfait/daren.be/actions/workflows/deploy-fly.yml/badge.svg
[fly-deploy-action]: https://github.com/darenmalfait/daren.be/actions/workflows/deploy-fly.yml
[release-studio-badge]: https://github.com/darenmalfait/daren.be/actions/workflows/release-studio.yml/badge.svg
[release-studio-action]: https://github.com/darenmalfait/daren.be/actions/workflows/release-studio.yml
[conventional_commits_blog]: https://daren.be/en/blog/2022/02/writing-the-perfect-git-commit-message
[github-action-secrets]: https://github.com/darenmalfait/daren.be/settings/secrets/actions
[fly_new_access_token]: https://web.fly.io/user/personal_access_tokens/new
[generate_password]: https://1password.com/generate-password