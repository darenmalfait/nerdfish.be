import { mapPageData } from '../api'
import { Blocks, type ContentQueryQuery, type PageBlocks } from '~/app/cms'
import { type Locale } from '~/app/i18n'

export function PageContent({
	data,
	locale,
}: {
	data: ContentQueryQuery
	locale?: Locale
}) {
	return (
		<Blocks
			items={data.page.blocks as PageBlocks[]}
			globalData={{ ...mapPageData(data) }}
			locale={locale}
		/>
	)
}
