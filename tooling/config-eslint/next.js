module.exports = {
  extends: [
    require.resolve('./react-library'),
    'next',
  ],
  overrides: [
    {
      files: ['**/route.tsx'],
      rules: {
        '@next/next/no-img-element': 'off',
        'jsx-a11y/alt-text': 'off',
      },
    },
    {
      files: [
        'pages/**',
        'src/pages/**',
        'next.config.js',
        'app/**/{head,layout,page,error,not-found}.tsx',
        'src/app/**/{head,layout,loading,page,error,not-found}.tsx',
        'src/app/**/*.page.tsx',
      ],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
  ignorePatterns: [
    '**/.next/**',
    '**/.eslintrc.cjs',
    '**/node_modules/**',
    'public/**',
  ],
}
