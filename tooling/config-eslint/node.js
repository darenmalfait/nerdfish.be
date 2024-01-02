module.exports = {
  extends: [
    'turbo',
    ...['eslint-config-daren'].map(config => require.resolve(config)),
  ],
  ignorePatterns: ['node_modules/', 'dist/', 'out/'],
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
  },
  root: true,
}
