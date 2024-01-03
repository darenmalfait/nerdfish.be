const {fontFamily} =
  // eslint-disable-next-line
  require("tailwindcss/defaultTheme") as typeof import("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    'src/**/*.{ts,tsx}',
    '../../node_modules/@nerdfish/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
      },
      screens: {
        // iPad Pro vertical is 1024px exactly
        lg: '1025px',
      },
      spacing: {
        18: '4.5rem',
        112: '25rem',
        120: '27rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@nerdfish/tailwind-config'),
  ],
}
