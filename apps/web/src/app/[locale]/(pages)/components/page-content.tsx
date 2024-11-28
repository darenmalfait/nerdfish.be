import { Blocks } from '~/app/cms/blocks-renderer'
import type { ContentQueryQuery } from '~/app/cms/types'
import type { Locale } from '~/app/i18n/types'
import { mapPageData } from '../api'

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
