// this is a way to get tailwind autocomplete to work

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/**/*.{ts,tsx}',
    '../../node_modules/@nerdfish/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{ts,tsx}',
  ],
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@nerdfish/tailwind-config'),
  ],
}
