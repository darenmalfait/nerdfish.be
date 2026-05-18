import { expect } from '@playwright/test'
import { BLOG_POST_URL_PATTERN } from './blog.builders'
import { test } from './blog.fixture'

test.describe('User Story: As a user, I want to browse the blog', () => {
	test.describe('Given the user is on the blog page', () => {
		test.beforeEach(async ({ blogPage }) => {
			await blogPage.goto()
		})

		test('it should show blog posts', async ({ blogPage }) => {
			await expect(blogPage.getPostLinks().first()).toBeVisible()
		})

		test.describe('When I search for a term with no matches', () => {
			test.beforeEach(async ({ blogPage }) => {
				await blogPage.search('zzznomatchzzz')
			})

			test('it should show an empty state', async ({ blogPage }) => {
				await expect(blogPage.getEmptyState()).toBeVisible()
			})
		})

		test.describe('When I click on a post', () => {
			test.beforeEach(async ({ blogPage }) => {
				await blogPage.openFirstPost()
			})

			test('it should navigate to the post page', async ({ blogPage }) => {
				await expect(blogPage.page).toHaveURL(BLOG_POST_URL_PATTERN)
			})
		})
	})
})
