import { mapPageData } from '../api'
import { Blocks, type ContentQueryQuery } from '~/app/cms'
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
			items={data.page.blocks}
			globalData={{ ...mapPageData(data) }}
			locale={locale}
		/>
	)
}
