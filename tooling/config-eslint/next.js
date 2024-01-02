module.exports = {
  extends: [
    'turbo',
    ...[
      'eslint-config-daren',
      'eslint-config-daren/react',
      'eslint-config-daren/jsx-a11y',
      'eslint-config-daren/tailwind',
    ].map(config => require.resolve(config)),
  ],
  ignorePatterns: [
    '**/.next/**',
    '**/.eslintrc.cjs',
    '**/node_modules/**',
    'public/**',
  ],
  parserOptions: {
    tsconfigRootDir: `${__dirname}/tsconfig.json`,
  },
  root: true,
}
