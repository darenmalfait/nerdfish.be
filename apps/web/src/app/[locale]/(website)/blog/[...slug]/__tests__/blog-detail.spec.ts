import { expect } from '@playwright/test'
import { RELATED_POST_COUNT, SAMPLE_BLOG_POST } from './blog-detail.builders'
import { test } from './blog-detail.fixture'

test.describe('User Story: The user wants to read a blog post', () => {
	test.describe('Given the user opens a published blog post', () => {
		test.beforeEach(async ({ blogDetailPage }) => {
			await blogDetailPage.goto()
		})

		test('it should show the post title', async ({ blogDetailPage }) => {
			await expect(blogDetailPage.getArticleHeading()).toHaveText(
				SAMPLE_BLOG_POST.title,
			)
		})

		test('it should set the page title from post SEO metadata', async ({
			blogDetailPage,
		}) => {
			await expect(blogDetailPage.page).toHaveTitle(SAMPLE_BLOG_POST.pageTitle)
		})

		test('it should show breadcrumb navigation back to the blog', async ({
			blogDetailPage,
		}) => {
			await expect(blogDetailPage.getBreadcrumbBlogLink()).toBeVisible()
		})

		test('it should show related posts', async ({ blogDetailPage }) => {
			await blogDetailPage.scrollToRelatedPosts()
			await expect(blogDetailPage.getRelatedPostLinks()).toHaveCount(
				RELATED_POST_COUNT,
			)
		})
	})

	test.describe('Given the user opens a non-existent blog post', () => {
		test.beforeEach(async ({ blogDetailPage }) => {
			await blogDetailPage.gotoInvalid()
		})

		test('it should show the not found page', async ({ blogDetailPage }) => {
			await expect(blogDetailPage.getNotFoundHeading()).toBeVisible()
		})
	})
})
