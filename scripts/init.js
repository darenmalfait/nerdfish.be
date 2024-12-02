#!/usr/bin/env node
import { execSync } from 'node:child_process'
import fs, { constants } from 'node:fs'

try {
	console.info('Installing dependencies...')
	execSync('pnpm install', { stdio: 'inherit' })

	console.info('Creating .env files...')
	for (const app of ['web', 'email']) {
		fs.copyFileSync('.env.example', `apps/${app}/.env`, constants.COPYFILE_EXCL)
	}
} catch (error) {
	console.error('Failed to initialize project:', error.message)
	process.exit(1)
}
