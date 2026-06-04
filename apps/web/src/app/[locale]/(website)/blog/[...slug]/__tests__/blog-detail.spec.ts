import { expect } from '@playwright/test'
import { i18n } from '@repo/i18n/config'
import { allPosts } from 'content-collections'
import { expectedPageTitle } from 'playwright/utils/seo'
import { getBlogPath } from '../../utils'
import { RELATED_POST_COUNT } from './blog-detail.builders'
import { test } from './blog-detail.fixture'

const [TEST_BLOG_POST] = allPosts
	.filter((post) => post.locale === i18n.defaultLocale)
	.map((post) => ({
		title: post.title,
		path: getBlogPath(post),
		pageTitle: expectedPageTitle(post.seo.title),
	}))

if (!TEST_BLOG_POST) {
	throw new Error('Expected at least one blog post in default locale')
}

test.describe('User Story: The user wants to read a blog post', () => {
	test.describe('Given the user opens a blog post', () => {
		test.beforeEach(async ({ blogDetailPage }) => {
			await blogDetailPage.goto(TEST_BLOG_POST.path)
		})

		test('it should show the post title', async ({ blogDetailPage }) => {
			await expect(blogDetailPage.getArticleHeading()).toHaveText(
				TEST_BLOG_POST.title,
			)
		})

		test('it should set the page title from post SEO metadata', async ({
			blogDetailPage,
		}) => {
			await expect(blogDetailPage.page).toHaveTitle(TEST_BLOG_POST.pageTitle)
		})

		test('it should show breadcrumb navigation back to the blog', async ({
			blogDetailPage,
		}) => {
			await expect(blogDetailPage.getBreadcrumbBlogLink()).toBeVisible()
		})

		test('it should show related posts', async ({ blogDetailPage }) => {
			const relatedLinks = blogDetailPage.getRelatedPostLinks()
			await expect(relatedLinks).toHaveCount(RELATED_POST_COUNT)
			await relatedLinks.first().scrollIntoViewIfNeeded()
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
