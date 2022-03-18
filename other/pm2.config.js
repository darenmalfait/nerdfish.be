const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  FORCE_COLOR: '1',
}

module.exports = {
  apps: [
    {
      name: 'Server',
      script: 'dotenv -- remix dev',
      ignore_watch: ['.'],
      env,
    },
    {
      name: 'Tailwind',
      script: 'npm run generate:css -- --watch',
      autorestart: false,
      ignore_watch: ['.'],
      env,
    },
    {
      name: 'Studio',
      script: 'cd studio && npm run dev',
      autorestart: false,
      ignore_watch: ['.'],
      env,
    },
  ],
}
