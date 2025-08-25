import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	timeout: 15 * 1000,
	expect: {
		timeout: 5 * 1000,
	},
	fullyParallel: false,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: [['html', { open: 'never' }]],
	use: {
		baseURL: 'http://localhost:3000',
		trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure',
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
	webServer: {
		command: 'pnpm start',
		url: 'http://localhost:3000',
		reuseExistingServer: !process.env.CI,
	},
})
