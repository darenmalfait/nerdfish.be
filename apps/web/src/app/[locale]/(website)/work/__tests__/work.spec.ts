import { expect } from '@playwright/test'
import { WORK_PROJECT_URL_PATTERN } from './work.builders'
import { test } from './work.fixture'

test.describe('User Story: As a user, I want to browse work projects', () => {
	test.describe('Given the user is on the work page', () => {
		test.beforeEach(async ({ workPage }) => {
			await workPage.goto()
		})

		test('it should show work projects', async ({ workPage }) => {
			await expect(workPage.getPageHeading()).toBeVisible()
			await expect(workPage.getProjectLinks().first()).toBeVisible()
		})

		test.describe('When I click on a project', () => {
			test.beforeEach(async ({ workPage }) => {
				await workPage.openFirstProject()
			})

			test('it should navigate to the project page', async ({ workPage }) => {
				await expect(workPage.page).toHaveURL(WORK_PROJECT_URL_PATTERN)
			})
		})
	})
})
