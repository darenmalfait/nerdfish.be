<div align="center">
<h1>nerdfish.be</h1>

<p>Nerdfish website</p>
</div>

---

Nerdfish is an Alias for my Freelance business.

This repository contains the code for nerdfish.be. The website is built using
the app-directory approach for Next.js, tailwindcss for styling and tinacms as a
CMS. It's structured as a mono-repo using turbo.

It uses the app-directory structure for Next.js.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Environment Variables](#environment-variables)
- [Install](#install)
- [Path To Tina](#path-to-tina)
- [Favicon](#favicon)
- [Commit Messages](#commit-messages)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Environment Variables

The following environment variables are required to run the website:

- `NEXT_PUBLIC_TINA_CLIENT_ID`: This is retrieved from your project at
  app.tina.io.
- `TINA_TOKEN`: This is retrieved from your project at app.tina.io.
- `NEXT_PUBLIC_TINA_BRANCH`: This is set by default CI with
  Netlify/Vercel/Github, but can be overridden.
- `NEXT_PUBLIC_RECAPTCHA_SITEKEY`: Recaptcha public key.
- `RECAPTCHA_SECRETKEY`: Recaptcha secret key.
- `RESEND_API_KEY`: Found in resend.

## Install

The package manager used in this project is pnpm. To install the required
packages, run the following command:

```bash
pnpm i
```

To run the project locally, use the following command:

This starts tinacms and the website on port 3000. The CMS is available at
http://localhost:3000/admin.

```bash
pnpm dev
```

## Path To Tina

If your GitHub repository uses a monorepo structure, the Path To Tina Config
input can be used to specify the path to the tina directory in your repository.
For example, if you have a project named my-site, and it is located in the
projects directory of your repository, you would enter projects/my-site in this
field and click Save Project to update the project.

In this case: it's needed to fill in the `path` in the cloud configuration to
`apps/web` to be able to index the content.

## Favicon

The website's favicon was generated with
[https://realfavicongenerator.net/](https://realfavicongenerator.net/).

## Commit Messages

The commit messages for this project follow the semantic format. For more
information on how to write the perfect commit message, please refer to this
[blog post](https://www.nerdfish.be/blog/2022/02/writing-the-perfect-git-commit-message).

## License

This website is licensed under the MIT license. Please see the LICENSE file for
more information.
