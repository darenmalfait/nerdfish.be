const { fontFamily } =
	// eslint-disable-next-line
	require('tailwindcss/defaultTheme') as typeof import('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'src/**/*.{ts,tsx}',
		'../../node_modules/@nerdfish/**/*.{js,ts,jsx,tsx}',
		'../../packages/ui/src/**/*.{ts,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-geist-sans)', ...fontFamily.sans],
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
			screens: {
				// iPad Pro vertical is 1024px exactly
				lg: '1025px',
			},
			spacing: {
				18: '4.5rem',
				112: '25rem',
				120: '27rem',
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
			},
			animation: {
				scrollIndicator: 'scrollIndicator 2s ease infinite',
			},
		},
	},
	plugins: [
		require('tailwindcss-motion'),
		require('tailwindcss-animate'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/typography'),
		require('@nerdfish/tailwind-config'),
	],
}
