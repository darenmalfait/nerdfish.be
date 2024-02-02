const {fontFamily} =
  // eslint-disable-next-line
  require('tailwindcss/defaultTheme') as typeof import('tailwindcss/defaultTheme')

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
      colors: {
        blog: {
          DEFAULT: 'var(--color-blog)',
          unkown: 'var(--color-blog-unknown)',
          technical: 'var(--color-blog-technical)',
          project: 'var(--color-blog-project)',
          wiki: 'var(--color-blog-wiki)',
          coaching: 'var(--color-blog-coaching)',
        },
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
