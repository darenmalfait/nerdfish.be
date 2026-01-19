import { config as defaultConfig } from '@nerdfish/config/eslint'

/** @type {import("eslint").Linter.Config} */
export default [
	...defaultConfig,
	{
		files: ['**/*.ts?(x)', '**/*.js?(x)'],
		settings: {
			react: {
				version: 'detect',
			},
		},
		plugins: {
			'@next/next': (await import('@next/eslint-plugin-next')).default,
		},
		rules: {
			...(await import('@next/eslint-plugin-next')).default.configs.recommended
				.rules,
			...(await import('@next/eslint-plugin-next')).default.configs[
				'core-web-vitals'
			].rules,
			'@next/next/no-img-element': 'error',
		},
	},
	{
		ignores: [
			'**/__generated__/**',
			'**/.next/**',
			'**/.react-email/**',
			'**/.turbo/**',
			'**/dist/**',
			'**/next-env.d.ts',
			'**/next/**',
			'**/public/**',
			'**/generated/**',
			'**/.content-collections/**',
			'**/.obsidian/**',
			'**/.makemd/**',
			'**/.space/**',
			'**/.trash/**',
			'**/.clerk/**',
		],
	},
]
