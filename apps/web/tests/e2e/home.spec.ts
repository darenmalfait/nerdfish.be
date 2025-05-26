import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import A11yError from 'playwright/utils/a11y-logger'
import { A11YTAGS } from './constants'

test.beforeEach(async ({ page }) => {
	await page.goto('/')
})

test.describe('homepage a11y', () => {
	test('homepage should not have any automatically detectable WCAG A or AA violations in light mode', async ({
		page,
	}) => {
		await page.getByLabel('Switch to Light theme').first().click()

		await expect(
			page.getByRole('heading', { level: 1, name: 'Nerdfish' }),
		).toBeVisible()

		const a11yScanResults = await new AxeBuilder({ page })
			.withTags(A11YTAGS)
			.analyze()
		if (a11yScanResults.violations.length > 0) {
			throw new A11yError(a11yScanResults.violations)
		}
		expect(a11yScanResults.violations).toEqual([])
	})

	test('homepage should not have any automatically detectable WCAG A or AA violations in dark Mode', async ({
		page,
	}) => {
		await page.getByLabel('Switch to Dark theme').first().click()

		await expect(
			page.getByRole('heading', { level: 1, name: 'Nerdfish' }),
		).toBeVisible()

		const a11yScanResults = await new AxeBuilder({ page })
			.withTags(A11YTAGS)
			.analyze()

		if (a11yScanResults.violations.length > 0) {
			throw new A11yError(a11yScanResults.violations)
		}
		expect(a11yScanResults.violations).toEqual([])
	})
})
