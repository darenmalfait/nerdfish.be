import { expect } from '@playwright/test'

import { i18n } from '@repo/i18n/config'
import { allProjects } from 'content-collections'
import { expectedPageTitle } from 'playwright/utils/seo'
import { getWorkPath } from '../../utils'
import { RELATED_PROJECT_COUNT } from './work-detail.builders'
import { test } from './work-detail.fixture'

const [TEST_WORK_PROJECT] = allProjects
	.filter((project) => project.locale === i18n.defaultLocale)
	.map((project) => ({
		title: project.title,
		path: getWorkPath(project),
		pageTitle: expectedPageTitle(project.seo.title),
		url: project.url,
	}))

if (!TEST_WORK_PROJECT) {
	throw new Error('Expected at least one work project in default locale')
}

test.describe('User Story: The user wants to view a work project', () => {
	test.describe('Given the user opens a work project', () => {
		test.beforeEach(async ({ workDetailPage }) => {
			await workDetailPage.goto(TEST_WORK_PROJECT.path)
		})

		test('it should show the project title', async ({ workDetailPage }) => {
			await expect(workDetailPage.getProjectTitle()).toHaveText(
				TEST_WORK_PROJECT.title,
			)
		})

		test('it should set the page title from project SEO metadata', async ({
			workDetailPage,
		}) => {
			await expect(workDetailPage.page).toHaveTitle(TEST_WORK_PROJECT.pageTitle)
		})

		if (TEST_WORK_PROJECT.url) {
			test('it should show a link to the project website', async ({
				workDetailPage,
			}) => {
				await expect(workDetailPage.getVisitWebsiteLink()).toBeVisible()
			})
		}

		test('it should show related projects', async ({ workDetailPage }) => {
			const relatedLinks = workDetailPage.getRelatedProjectLinks()
			await expect(relatedLinks).toHaveCount(RELATED_PROJECT_COUNT)
			await expect(relatedLinks.first()).toBeVisible()
		})
	})

	test.describe('Given the user opens a non-existent work project', () => {
		test.beforeEach(async ({ workDetailPage }) => {
			await workDetailPage.gotoInvalid()
		})

		test('it should show the not found page', async ({ workDetailPage }) => {
			await expect(workDetailPage.getNotFoundHeading()).toBeVisible()
		})
	})
})
