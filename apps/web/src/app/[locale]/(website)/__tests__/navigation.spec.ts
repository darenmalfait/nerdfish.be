import { expect } from '@playwright/test'
import {
	ABOUT_URL_PATTERN,
	BLOG_URL_PATTERN,
	CONTACT_URL_PATTERN,
	EXPERTISE_WEBDESIGN_URL_PATTERN,
	WORK_URL_PATTERN,
} from './home.builders'
import { test } from './home.fixture'

test.describe('User Story: The user wants to navigate the site using the main navigation', () => {
	test.describe('Given the user is on the homepage', () => {
		test.beforeEach(async ({ homePage }) => {
			await homePage.goto()
		})

		test('it should show the main navigation', async ({ homePage }) => {
			await expect(homePage.navigation.main.root).toBeVisible()
		})

		test.describe('When the user clicks About', () => {
			test.beforeEach(async ({ homePage }) => {
				await homePage.navigation.main.clickNavLink('About')
			})

			test('it should navigate to the about page', async ({ page }) => {
				await expect(page).toHaveURL(ABOUT_URL_PATTERN)
				await expect(
					page.getByRole('heading', { level: 1, name: 'About' }),
				).toBeVisible()
			})
		})

		test.describe('When the user clicks Blog', () => {
			test.beforeEach(async ({ homePage }) => {
				await homePage.navigation.main.clickNavLink('Blog')
			})

			test('it should navigate to the blog page', async ({ page }) => {
				await expect(page).toHaveURL(BLOG_URL_PATTERN)
				await expect(
					page.getByRole('heading', { level: 1, name: 'Blog' }),
				).toBeVisible()
			})
		})

		test.describe('When the user clicks Work', () => {
			test.beforeEach(async ({ homePage }) => {
				await homePage.navigation.main.clickNavLink('Work')
			})

			test('it should navigate to the work page', async ({ page }) => {
				await expect(page).toHaveURL(WORK_URL_PATTERN)
				await expect(
					page.getByRole('heading', { level: 1, name: 'Projects' }),
				).toBeVisible()
			})
		})

		test.describe('When the user clicks Contact', () => {
			test.beforeEach(async ({ homePage }) => {
				await homePage.navigation.main.clickNavLink('Contact')
			})

			test('it should navigate to the contact page', async ({ page }) => {
				await expect(page).toHaveURL(CONTACT_URL_PATTERN)
				await expect(
					page.getByRole('button', { name: "Let's get started" }),
				).toBeVisible()
			})
		})

		test.describe('When the user opens Websites within the Expertise menu', () => {
			test.beforeEach(async ({ homePage }) => {
				await homePage.navigation.main.openExpertiseMenu()
				await homePage.navigation.main.clickExpertiseLink('Websites')
			})

			test('it should navigate to the webdesign expertise page', async ({
				page,
			}) => {
				await expect(page).toHaveURL(EXPERTISE_WEBDESIGN_URL_PATTERN)
				await expect(
					page.getByRole('heading', { level: 1, name: 'Websites' }),
				).toBeVisible()
			})
		})
	})
})

test.describe('User Story: The user wants to navigate the site using the mobile navigation', () => {
	test.use({ viewport: { width: 390, height: 844 } })

	test.describe('Given the user is on the homepage', () => {
		test.beforeEach(async ({ homePage }) => {
			await homePage.goto()
		})

		test('it should hide the desktop main navigation', async ({ homePage }) => {
			await expect(homePage.navigation.main.root).toBeHidden()
		})

		test.describe('When the user opens the navigation menu', () => {
			test.beforeEach(async ({ homePage }) => {
				await homePage.navigation.mobile.openMenu()
			})

			test('it should show the navigation drawer', async ({ homePage }) => {
				await expect(homePage.navigation.mobile.getDrawer()).toBeVisible()
			})
		})

		test.describe('When the user clicks About', () => {
			test.beforeEach(async ({ homePage }) => {
				await homePage.navigation.mobile.clickNavLink('About')
			})

			test('it should navigate to the about page', async ({ page }) => {
				await expect(page).toHaveURL(ABOUT_URL_PATTERN)
				await expect(
					page.getByRole('heading', { level: 1, name: 'About' }),
				).toBeVisible()
			})

			test('it should close the navigation drawer', async ({ homePage }) => {
				await expect(homePage.navigation.mobile.getDrawer()).toBeHidden()
			})
		})

		test.describe('When the user clicks Blog', () => {
			test.beforeEach(async ({ homePage }) => {
				await homePage.navigation.mobile.clickNavLink('Blog')
			})

			test('it should navigate to the blog page', async ({ page }) => {
				await expect(page).toHaveURL(BLOG_URL_PATTERN)
				await expect(
					page.getByRole('heading', { level: 1, name: 'Blog' }),
				).toBeVisible()
			})
		})

		test.describe('When the user clicks Work', () => {
			test.beforeEach(async ({ homePage }) => {
				await homePage.navigation.mobile.clickNavLink('Work')
			})

			test('it should navigate to the work page', async ({ page }) => {
				await expect(page).toHaveURL(WORK_URL_PATTERN)
				await expect(
					page.getByRole('heading', { level: 1, name: 'Projects' }),
				).toBeVisible()
			})
		})

		test.describe('When the user clicks Contact', () => {
			test.beforeEach(async ({ homePage }) => {
				await homePage.navigation.mobile.clickNavLink('Contact')
			})

			test('it should navigate to the contact page', async ({ page }) => {
				await expect(page).toHaveURL(CONTACT_URL_PATTERN)
				await expect(
					page.getByRole('button', { name: "Let's get started" }),
				).toBeVisible()
			})
		})

		test.describe('When the user clicks Websites in the navigation menu', () => {
			test.beforeEach(async ({ homePage }) => {
				await homePage.navigation.mobile.clickExpertiseLink('Websites')
			})

			test('it should navigate to the webdesign expertise page', async ({
				page,
			}) => {
				await expect(page).toHaveURL(EXPERTISE_WEBDESIGN_URL_PATTERN)
				await expect(
					page.getByRole('heading', { level: 1, name: 'Websites' }),
				).toBeVisible()
			})
		})
	})
})
