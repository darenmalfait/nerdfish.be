---
seo:
  title: Deploying to fly with a postgres db
  description: |
    Guideline on how to deploy an app with a Postgres db to fly.io
title: Deploying to fly with a postgres db
tags:
  - devops
  - webdevelopment
excerpt: |
  Guideline on how to deploy an app with a Postgres db to fly.io
date: 2022-03-15T23:00:00.000Z
---

## Remix Fly Stack

[Remix docs](https://remix.run/docs)

## Before you get started

Note apps on Fly require a globally unique name. We've used the name of the
current directory, plus four random characters. You can change this at any time
BEFORE you deploy.

## Fly Setup

- [Install Fly](https://fly.io/docs/getting-started/installing-flyctl/)
- Sign up and log in to Fly

```
flyctl auth signup
```

## The Database

In development, it's better to use a local database, The easiest way to do this
is using Docker. To start your Postgres database, first make sure you have
Docker running, then run the following command:

```
docker-compose up
```

That may take a moment to start up as it needs to get the Postgres image from
the Docker registry. After it is ready, you'll need to migrate your database.
With the database prepared to accept connections, open a new tab and run this:

```
npx prisma migrate deploy
```

When this finishes successfully, it will say "All migrations have been
successfully applied".

If you prefer not to use Docker, you can also use Fly's Wireguard VPN to connect
to a development database (or your production database). You can find the
instructions to set up
[Wireguard](https://fly.io/docs/reference/private-networking/#install-your-wireguard-app)
and create a development [database](https://fly.io/docs/reference/postgres/)
here.

## Development

With your Postgres database up and running in one tab and set up with tables for
your data model via Prisma, you're ready to start the dev server. But first, run
this command in a new tab in your terminal:

```
npm run dev
```

That command starts your app in development mode, rebuilding assets on file
changes.

## Deployment

Using GitHub actions, you can automatically deploy your application to fly.

```
name: Fly Deploy Production
on:
  push:
    branches:
      - main
    paths:
      - ".github/**"
      - "app/**"
      - "styles/**"
env:
  FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
jobs:
  deploy:
    name: Deploy app
    runs-on: ubuntu-latest
    steps:
      - name: Cancel Previous Runs
        uses: styfle/cancel-workflow-action@0.9.1

      - uses: actions/checkout@v2

      - name: Deploy to Production
        uses: superfly/flyctl-actions@1.1
        with:
          args: "deploy --config ./fly.production.toml"

```

Before your first deployment, you'll need to do a few things:

- Create a new GitHub Repository
- Create two apps on Fly, one for staging and one for production:

```
fly create [YOUR_APP_NAME]-staging
fly create [YOUR_APP_NAME]
```

Make sure you have a FLY_API_TOKEN added to your GitHub repo. Go to your user
settings on Fly and create a new token, then add it to your repo secrets with
the name FLY_API_TOKEN. Finally, you'll need to add a SESSION_SECRET to your fly
app secrets. To do that, you can run the following commands:

```
fly secrets set SESSION_SECRET=$(openssl rand -hex 32) -c fly.staging.toml
fly secrets set SESSION_SECRET=$(openssl rand -hex 32) -c fly.production.toml
```

If you don't have OpenSSL installed, you can also use 1password to generate a
random secret. Just replace \`$(openssl rand -hex 32)\` with the generated
secret.

- Create a database for both your staging and production environments. Run the
  following for both of your environments and follow the prompts (your App name
  is "\[YOUR_APP_NAME]-db")

```
fly postgres create
```

afterwards, you'll need to connect your database to each of your apps

```
fly postgres attach --postgres-app [YOUR_APP_NAME]-db --app [YOUR_APP_NAME]
```

Fly will take care of setting the DATABASE_URL secret for you.

Everything is ready, and now you can commit and push your changes to your repo.
Every commit to your \`main\` branch will trigger a deployment to your
production environment, and every commit to your \`dev\` branch will trigger a
deployment to your staging environment.
