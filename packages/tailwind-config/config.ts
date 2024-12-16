import nerdfishConfig from '@nerdfish/tailwind-config'
import aspectRatio from '@tailwindcss/aspect-ratio'
import typography from '@tailwindcss/typography'
import defaultTheme from 'tailwindcss/defaultTheme'
import { type Config } from 'tailwindcss/types/config'
import animate from 'tailwindcss-animate'

export const config: Config = {
	content: [
		'../../node_modules/@nerdfish/**/*.{js,ts,jsx,tsx}', // path to nerdfishui
		'./node_modules/@nerdfish/**/*.{js,ts,jsx,tsx}', // path to nerdfishui
		'./node_modules/@repo/design-system/components/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	plugins: [
		nerdfishConfig,
		aspectRatio,
		animate,
		typography,
		require('tailwindcss-motion'),
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-geist-sans)', ...defaultTheme.fontFamily.sans],
				mono: ['var(--font-geist-mono)', ...defaultTheme.fontFamily.mono],
			},
			container: {
				center: true,
				padding: '1rem',
			},
			colors: {
				blog: {
					DEFAULT: 'hsl(var(--color-blog) / <alpha-value>)',
					unkown: 'hsl(var(--color-blog-unknown) / <alpha-value>)',
					technical: 'hsl(var(--color-blog-technical) / <alpha-value>)',
					project: 'hsl(var(--color-blog-project) / <alpha-value>)',
					wiki: 'hsl(var(--color-blog-wiki) / <alpha-value>)',
					coaching: 'hsl(var(--color-blog-coaching) / <alpha-value>)',
				},
				work: {
					DEFAULT: 'hsl(var(--color-work) / <alpha-value>)',
					webdesign: 'hsl(var(--color-work-webdesign) / <alpha-value>)',
					branding: 'hsl(var(--color-work-branding) / <alpha-value>)',
					print: 'hsl(var(--color-work-print) / <alpha-value>)',
				},
			},
			keyframes: {
				float: {
					'0%': {
						transform: 'translateY(0)',
					},
					'50%': {
						transform: 'translateY(10px)',
					},
					'100%': {
						transform: 'translateY(0)',
					},
				},
				scrollIndicator: {
					'0%': {
						transform: 'translate3d(-1px, 0, 0)',
						opacity: '0',
					},
					'20%': {
						transform: 'translate3d(-1px, 0, 0)',
						opacity: '1',
					},
					'100%': {
						transform: 'translate3d(-1px, 8px, 0)',
						opacity: '0',
					},
				},
				'background-position-spin': {
					'0%': { backgroundPosition: 'top center' },
					'100%': { backgroundPosition: 'bottom center' },
				},
			},
			animation: {
				float: 'float 5s ease-in-out infinite',
				scrollIndicator: 'scrollIndicator 2s ease-in-out infinite',
				'background-position-spin':
					'background-position-spin 3000ms infinite alternate',
			},
		},
	},
}
