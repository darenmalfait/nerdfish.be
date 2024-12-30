import { config as defaultConfig } from '@nerdfish/config/eslint'

/** @type {import("eslint").Linter.Config} */
export default [
	...defaultConfig,
	{
		ignores: [
			'**/__generated__/**',
			'**/.next/**',
			'**/.react-email/**',
			'**/.turbo/**',
			'**/dist/**',
			'**/next-env.d.ts',
			'**/next/**',
			'**/tina-lock.json',
			'**/public/**',
			'**/generated/**',
			'**/.content-collections/**',
		],
	},
]
