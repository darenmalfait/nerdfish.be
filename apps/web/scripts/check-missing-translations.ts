import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

type JsonObject = { [key: string]: JsonValue }
type JsonValue = string | JsonObject

const TEMPLATE_LANGUAGE = 'en'
const DICTIONARIES_PATH = join(
	dirname(fileURLToPath(import.meta.url)),
	'../../../packages/i18n/dictionaries',
)

const args = process.argv.slice(2)
const shouldFix = args.includes('--fix')
const specificLocales = args.filter((arg) => !arg.startsWith('--'))

function isJsonObject(value: unknown): value is JsonObject {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function flatten(value: JsonValue, prefix = ''): Record<string, string> {
	if (typeof value === 'string') {
		return prefix ? { [prefix]: value } : {}
	}

	const entries: Record<string, string> = {}

	for (const [key, nested] of Object.entries(value)) {
		const path = prefix ? `${prefix}.${key}` : key
		Object.assign(entries, flatten(nested, path))
	}

	return entries
}

function setPath(target: JsonObject, path: string, value: string) {
	const parts = path.split('.')
	let current: JsonObject = target

	for (const part of parts.slice(0, -1)) {
		const next = current[part]
		if (!isJsonObject(next)) {
			current[part] = {}
		}
		current = current[part] as JsonObject
	}

	const leaf = parts.at(-1)
	if (!leaf) return

	current[leaf] = value
}

function readDictionary(locale: string): JsonObject {
	const path = join(DICTIONARIES_PATH, `${locale}.json`)
	const parsed: unknown = JSON.parse(readFileSync(path, 'utf8'))

	if (!isJsonObject(parsed)) {
		throw new Error(`Dictionary for "${locale}" must be a JSON object`)
	}

	return parsed
}

function listLocales(): string[] {
	return readdirSync(DICTIONARIES_PATH)
		.filter((file) => file.endsWith('.json'))
		.map((file) => file.replace(/\.json$/, ''))
}

function fillMissingKeys(
	dictionary: JsonObject,
	locale: string,
	missing: string[],
	templateEntries: Record<string, string>,
) {
	for (const key of missing) {
		const stub = templateEntries[key]
		if (stub === undefined) continue
		setPath(dictionary, key, stub)
	}

	writeFileSync(
		join(DICTIONARIES_PATH, `${locale}.json`),
		`${JSON.stringify(dictionary, null, '\t')}\n`,
	)
	console.info(
		`  ✅ Filled ${missing.length} missing key(s) with ${TEMPLATE_LANGUAGE} stubs`,
	)
}

function reportLocaleDiff(
	locale: string,
	templateEntries: Record<string, string>,
): boolean {
	if (!listLocales().includes(locale)) {
		console.error(`
❌ ${locale} is not found in ${DICTIONARIES_PATH}
Create ${join(DICTIONARIES_PATH, `${locale}.json`)} to add a locale.
`)
		return true
	}

	const localeDictionary = readDictionary(locale)
	const localeEntries = flatten(localeDictionary)
	const missing = Object.keys(templateEntries).filter(
		(key) => !(key in localeEntries),
	)
	const extra = Object.keys(localeEntries).filter(
		(key) => !(key in templateEntries),
	)

	if (!missing.length && !extra.length) return false

	console.info(`\n🌍 ${locale}`)

	if (missing.length) {
		console.info(`  Missing (${missing.length}):`)
		for (const key of missing) {
			console.info(`    - ${key}`)
		}

		if (shouldFix) {
			fillMissingKeys(localeDictionary, locale, missing, templateEntries)
		}
	}

	if (extra.length) {
		console.info(`  Extra (not in ${TEMPLATE_LANGUAGE}) (${extra.length}):`)
		for (const key of extra) {
			console.info(`    - ${key}`)
		}
	}

	return true
}

const allLocales = listLocales()
const templateEntries = flatten(readDictionary(TEMPLATE_LANGUAGE))

if (!allLocales.includes(TEMPLATE_LANGUAGE)) {
	console.error(
		`❌ Template locale "${TEMPLATE_LANGUAGE}" not found in ${DICTIONARIES_PATH}`,
	)
	process.exit(1)
}

const localesToCheck = specificLocales.length
	? specificLocales
	: allLocales.filter((locale) => locale !== TEMPLATE_LANGUAGE)

const hasIssues = localesToCheck
	.filter((locale) => locale !== TEMPLATE_LANGUAGE)
	.map((locale) => reportLocaleDiff(locale, templateEntries))
	.some(Boolean)

if (hasIssues) {
	if (!shouldFix) {
		console.info('\nRun with --fix to backfill missing keys from en.')
	}
	process.exit(1)
}

console.info('💯 All locales match the en dictionary keys.')
