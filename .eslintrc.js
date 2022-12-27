module.exports = {
  root: true,
  extends: ['daren', 'daren/react', 'daren/jsx-a11y'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/naming-convention': 'off',
    'react/react-in-jsx-scope': 'off',
  },
}
