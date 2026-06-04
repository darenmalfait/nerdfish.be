import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'

const appRoot = process.cwd()
const generatedDir = path.join(appRoot, '.content-collections/generated')

export default function globalSetup() {
	if (existsSync(generatedDir)) return

	execSync('pnpm build:content-collections', {
		cwd: appRoot,
		stdio: 'inherit',
	})
}
