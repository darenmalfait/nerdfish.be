/** @type {import('tailwindcss').Config} */
const {fontFamily} = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@nerdfish/tailwind-config'),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
      },
      colors: {
        twitter: '#1DA1F2',
        github: '#24292e',
        gray: {
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
        },
        blog: {
          unknown: 'var(--color-blog-unknown)',
          technical: 'var(--color-blog-technical)',
          project: 'var(--color-blog-project)',
          wiki: 'var(--color-blog-wiki)',
          coaching: 'var(--color-blog-coaching)',
          blog: 'var(--color-blog-blog)',
        },
      },
      spacing: {
        18: '4.5rem',
        112: '25rem',
        120: '27rem',
      },
      boxShadow: {
        blur: 'inset 0 0 1px 1px hsla(0,0%,100%,.9),0 20px 27px 0 rgba(0,0,0,.05)',
      },
    },
  },
}
