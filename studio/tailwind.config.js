const path = require('path')

const defaultTheme = require('tailwindcss/defaultTheme')

const fromRoot = p => path.join(__dirname, p)

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    // ... paths that use tailwind
    fromRoot('./node_modules/@daren/**/*.{js,ts,jsx,tsx}'), // path to daren
    fromRoot('./components/**/*.{js,jsx,ts,tsx}'),
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['Inter', ...defaultTheme.fontFamily.sans],
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Lora', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@daren/ui-core')],
}
