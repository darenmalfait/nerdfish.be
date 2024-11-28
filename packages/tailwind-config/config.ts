import nerdfishConfig from '@nerdfish/tailwind-config'
import aspectRatio from '@tailwindcss/aspect-ratio'
import typography from '@tailwindcss/typography'
import animate from 'tailwindcss-animate'
import defaultTheme from 'tailwindcss/defaultTheme'
import type { Config } from 'tailwindcss/types/config'

export const config: Config = {
	content: [
		'./node_modules/@nerdfish/**/*.{js,ts,jsx,tsx}',
		'./node_modules/@repo/ui/components/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	darkMode: 'class',
	plugins: [
		aspectRatio,
		animate,
		typography,
		require('tailwindcss-motion'),
		nerdfishConfig,
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-geist-sans)', ...defaultTheme.fontFamily.sans],
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
				scrollIndicator: 'scrollIndicator 2s ease infinite',
				'background-position-spin':
					'background-position-spin 3000ms infinite alternate',
			},
		},
	},
}
