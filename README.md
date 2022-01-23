<div align="center">
<h1>Daren Sanity Remix</h1>

<p>Remix with Sanity boilerplate</p>
</div>

---

The website is built using Remix. It uses Sanity headless CMS to provide data.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [☕ Setup](#-setup)
  - [Sanity](#sanity)
  - [App](#app)
      - [Sanity](#sanity-1)
      - [App](#app-1)
- [Making changes](#making-changes)
  - [✨ Creating blocks/sections](#-creating-blockssections)
- [🚀 Deployment](#-deployment)
  - [Manual deployment](#manual-deployment)
    - [App](#app-2)
      - [Import environment variables from a file](#import-environment-variables-from-a-file)
      - [deploy to fly](#deploy-to-fly)
    - [Studio](#studio)
  - [Continuous integration](#continuous-integration)
  - [Google Tag Manager](#google-tag-manager)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# ☕ Setup

Install node_modules with `npm install`.

## Sanity
If you don't have the [Sanity CLI](https://www.sanity.io/docs/getting-started-with-sanity-cli) installed, install it globally using `npm install -g @sanity/cli`.

1. `npm install` in the `/studio` folder
2. `sanity init` in the `/studio` folder
3. During Sanity's initalization it will warn you, type `Y` and hit `enter`:
    ```
    ? The current folder contains a configured Sanity studio. Would you like to reconfigure it? (Y/n)
    ```
4. When it asks you what dataset configuration to use, go with `production`.
5. Add CORS Origins to your newly created Sanity project (visit: [manage.sanity.io](https://manage.sanity.io) and go to Settings > API):
    - Add your Studio URLs **_with_** credentials: `http://localhost:3333` and `[subdomain].sanity.studio`
    - Add your front-end URLs **_with_** credentials: `http://localhost:3000` and `https://[subdomain].netlify.app`
6. (optional) In `/` run `npm run import` to import the preset data into the dataset.

> ⚠️ **Important!** <br />In case #6 isn't executed. For "singleton" documents, like settings sections, the schema uses `__experimental_actions`. You will need to comment out the `__experimental_actions` line in "singleton" schemas to publish settings for the first time. This is because a singleton is still a document type, and one needs to exist first before it can be edited. If you create a new singleton document. You need to add it to the list of singletons at `studio/parts/resolve-actions`

## App

1. Run `cp .env.example .env` file in the project folder.
2. Update all the `xxxxxx` values, here's where to find each:
  #### Sanity
  - `SANITY_STUDIO_PROJECT_URL` - The url where the project is hosted; https://www.example.com # no trailing slash

  #### App
  - `SANITY_API_TOKEN` - Generate an API token for your Sanity project. Access your project from the Sanity Manage dashboard, and navigate to: "Settings" -> "API" -> "Add New Token" button. Make sure you give `read` access!
  - `ENCRYPTION_KEY` - used for server cookies
  - `SENDGRID_API_KEY` - used for sending emails
  - `SANITY_STUDIO_PREVIEW_SECRET` - You can randomly generate a token for this yourself. It will be used to keep to communicate with the front-end. TODO: This is still WIP
  - `SANITY_STUDIO_HOSTED_URL` - The url where the project is hosted; https://www.example.com to set cors for SEO checker # no trailing slash

  *optional*
  - `GTM_ID` - If using Google Tag Manager this is your Container ID

Optional if you fill in sanity.json, not if you don't
  - `SANITY_STUDIO_API_PROJECT_ID` - You can grab this from your Sanity Manage dashboard
  - `SANITY_STUDIO_PROJECT_URL` - The root path of the web application with no trailing slash


# Making changes

## ✨ Creating blocks/sections

Blocks are elements that contain content and have a layout assigned to them. They can be added through the Sanity page builder to a page.

1. To add a blocks simply go to `/generate` and run `npm run create-block` and fill in everything.
2. In `/studio/schemas/blocks/` a new block will be made. Set up the content in the `content` file.
3. In `/app/components/sections/` a new Front-end placeholder is setup to start from.
> ⚠️ **Important!** <br />If you use a PortableText or a reference field inside the schema you will need to add custom queries to `/app/lib/queries` to support the references inside of those fields. Otherwise those fields will never see the light of day.

# 🚀 Deployment

## Manual deployment

### App

We are using fly.io to host our application

#### Import environment variables from a file
Perhaps you already have your environment variables stored in a local file like a .env file. You can use that as a source to bulk import into Fly like this:

`cat .env.production | tr '\n' ' ' | xargs flyctl secrets set`

Set a single secret
`flyctl --app daren-sanity-remix secrets set [name]=[value]`


#### deploy to fly

`flyctl --app daren-sanity-remix deploy .`

or if you're building locally you can re-use your docker cache
`flyctl deploy --local-only`


### Studio

1. Run `cp .env /studio/.env.production` file in the project folder.
2. Replace `.env.production` values with the values you want in production
3. `cd /studio`
4. `sanity deploy`

## Continuous integration

If you set the `.env` secrets [into github]([https://link](https://github.com/darenmalfait/remix-sanity-daren/settings/secrets/actions)), github actions wil make sure everything gets deployed to the right places.

## Google Tag Manager

In `/data` there is a file `gtm.json` which contains a google tag manager container which you can import to start from.

