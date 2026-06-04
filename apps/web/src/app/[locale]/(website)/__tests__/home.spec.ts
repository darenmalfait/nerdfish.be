import { expect } from '@playwright/test'
import { test } from './home.fixture'

test.describe('User Story: The user wants to use the homepage without accessibility barriers', () => {
	test.describe('Given the user is on the homepage', () => {
		test.beforeEach(async ({ homePage }) => {
			await homePage.goto()
		})

		test('it should show the hero heading', async ({ homePage }) => {
			await expect(homePage.getHeroHeading()).toBeVisible()
		})

		test.describe('When the user views the page in light mode', () => {
			test.beforeEach(async ({ homePage }) => {
				await homePage.themeSwitcher.selectLightTheme()
			})

			test('it should show the page in light mode', async ({ homePage }) => {
				await expect(homePage.themeSwitcher.getLightThemeOption()).toBeChecked()
			})

			test('it should have no WCAG A or AA violations', async ({
				homePage,
			}) => {
				expect(await homePage.getA11yViolations()).toHaveLength(0)
			})
		})

		test.describe('When the user views the page in dark mode', () => {
			test.beforeEach(async ({ homePage }) => {
				await homePage.themeSwitcher.selectDarkTheme()
			})

			test('it should show the page in dark mode', async ({ homePage }) => {
				await expect(homePage.themeSwitcher.getDarkThemeOption()).toBeChecked()
			})

			test('it should have no WCAG A or AA violations', async ({
				homePage,
			}) => {
				expect(await homePage.getA11yViolations()).toHaveLength(0)
			})
		})
	})
})
