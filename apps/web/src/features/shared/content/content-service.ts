import { type Locale } from '@repo/i18n/types'

type DatedSlugItem = {
	slug: string
	date: string
}

type LocalizedItem = DatedSlugItem & {
	locale?: string
}

abstract class ContentService<T extends DatedSlugItem> {
	constructor(protected readonly items: readonly T[]) {}

	protected byDateDesc(items: readonly T[]): T[] {
		return items.toSorted(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		)
	}

	abstract getAll(options?: unknown): Promise<T[]>
	abstract getLatest(options?: unknown): Promise<string | undefined>
	abstract get(options: { slug: string }): Promise<T | undefined>
}

class LocalizedContentService<
	T extends LocalizedItem,
> extends ContentService<T> {
	async getAll({ locale }: { locale?: Locale } = {}) {
		const filtered = locale
			? this.items.filter((item) => item.locale === locale)
			: [...this.items]

		return this.byDateDesc(filtered)
	}

	async getLatest({ locale }: { locale?: Locale } = {}) {
		const [latest] = await this.getAll({ locale })
		return latest?.slug
	}

	async get({ slug, locale }: { slug: string; locale?: Locale }) {
		return this.items.find(
			(item) => item.slug === slug && item.locale === locale,
		)
	}
}

class SingleLocaleContentService<
	T extends DatedSlugItem,
> extends ContentService<T> {
	async getAll() {
		return this.byDateDesc(this.items)
	}

	async getLatest() {
		const [latest] = await this.getAll()
		return latest?.slug
	}

	async get({ slug }: { slug: string }) {
		return this.items.find((item) => item.slug === slug)
	}
}

export { ContentService, LocalizedContentService, SingleLocaleContentService }
