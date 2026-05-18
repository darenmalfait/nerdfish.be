import { expect } from '@playwright/test'
import {
	ABOUT_URL_PATTERN,
	BLOG_URL_PATTERN,
	CONTACT_URL_PATTERN,
	EXPERTISE_WEBDESIGN_URL_PATTERN,
	WORK_URL_PATTERN,
} from './home.builders'
import { test } from './home.fixture'

test.describe('User Story: As a user, I want to navigate the site using the main navigation', () => {
	test.describe('Given the user is on the homepage', () => {
		test.beforeEach(async ({ homePage }) => {
			await homePage.goto()
		})

		test('it should show the main navigation', async ({ homePage }) => {
			await expect(homePage.navigation.getMainNavigation()).toBeVisible()
		})

		test.describe('When I click About', () => {
			test.beforeEach(async ({ homePage }) => {
				await homePage.navigation.clickNavLink('About')
			})

			test('it should navigate to the about page', async ({ page }) => {
				await expect(page).toHaveURL(ABOUT_URL_PATTERN)
				await expect(
					page.getByRole('heading', { level: 1, name: 'About' }),
				).toBeVisible()
			})
		})

		test.describe('When I click Blog', () => {
			test.beforeEach(async ({ homePage }) => {
				await homePage.navigation.clickNavLink('Blog')
			})

			test('it should navigate to the blog page', async ({ page }) => {
				await expect(page).toHaveURL(BLOG_URL_PATTERN)
				await expect(
					page.getByRole('heading', { level: 1, name: 'Blog' }),
				).toBeVisible()
			})
		})

		test.describe('When I click Work', () => {
			test.beforeEach(async ({ homePage }) => {
				await homePage.navigation.clickNavLink('Work')
			})

			test('it should navigate to the work page', async ({ page }) => {
				await expect(page).toHaveURL(WORK_URL_PATTERN)
				await expect(
					page.getByRole('heading', { level: 1, name: 'Projects' }),
				).toBeVisible()
			})
		})

		test.describe('When I click Contact', () => {
			test.beforeEach(async ({ homePage }) => {
				await homePage.navigation.clickNavLink('Contact')
			})

			test('it should navigate to the contact page', async ({ page }) => {
				await expect(page).toHaveURL(CONTACT_URL_PATTERN)
				await expect(
					page.getByRole('button', { name: "Let's get started" }),
				).toBeVisible()
			})
		})

		test.describe('When I open Websites within the Expertise menu', () => {
			test.beforeEach(async ({ homePage }) => {
				await homePage.navigation.openExpertiseMenu()
				await homePage.navigation.clickExpertiseLink('Websites')
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
