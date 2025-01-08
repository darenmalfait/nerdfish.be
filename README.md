<div align="center">
<h1>nerdfish.be</h1>

<p>Nerdfish website</p>
</div>

---

Nerdfish is an Alias for my Freelance business.

This repository contains the code for nerdfish.be. The website is built using
the app-directory approach for Next.js, tailwindcss for styling and
content-collections as a CMS. It's structured as a mono-repo using turbo.

It uses the app-directory structure for Next.js.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Environment Variables](#environment-variables)
- [Install](#install)
- [Favicon](#favicon)
- [Commit Messages](#commit-messages)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Environment Variables

The following environment variables are required to run the website:

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

This starts the website on port 3000.

```bash
pnpm dev
```

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
