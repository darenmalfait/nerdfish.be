/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [require.resolve('@nerdfish-website/lint/next')],
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
  },
};