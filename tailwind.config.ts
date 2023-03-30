import path from 'path'

import {type Config} from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const fromRoot = (relativePath: string) => path.join(__dirname, relativePath)

export default {
  theme: {
    extend: {
      fontFamily: {
        fallback: [...defaultTheme.fontFamily.sans],
        title: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
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
    },
  },
  darkMode: 'class', // or 'media' or 'class'
  content: [
    // ... paths that use tailwind
    fromRoot('./node_modules/@nerdfish/**/*.{js,ts,jsx,tsx}'), // path to nerdfish
    fromRoot('./pages/**/*.{js,jsx,ts,tsx}'),
    fromRoot('./pages-containers/**/*.{js,jsx,ts,tsx}'),
    fromRoot('./components/**/*.{js,jsx,ts,tsx}'),
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@nerdfish/tailwind-config'),
  ],
} satisfies Config
