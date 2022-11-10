module.exports = {
  root: true,
  extends: [`daren`],
  overrides: [
    {
      files: [`*.ts`, `*.tsx`],
      parserOptions: {
        project: `./tsconfig.json`,
      },
    },
  ],
}
