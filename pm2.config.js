module.exports = {
  apps: [
    {
      name: 'Server',
      script: 'dotenv -- remix dev',
      ignore_watch: ['.'],
      env: {
        NODE_ENV: process.env.NODE_ENV ?? 'development',
      },
    },
    {
      name: 'Postcss',
      script: 'npm run build:css',
      autorestart: false,
      watch: [
        './tailwind.config.js',
        './app/**/*.ts',
        './app/**/*.tsx',
        './styles/**/*.css',
      ],
      env: {
        NODE_ENV: process.env.NODE_ENV ?? 'development',
      },
    },
    {
      name: 'Studio',
      script: 'cd studio && npm run dev',
      autorestart: false,
      ignore_watch: ['.'],
      env: {
        NODE_ENV: process.env.NODE_ENV ?? 'development',
      },
    },
  ],
}
