import { type Locale } from '@repo/i18n/types'
import { Blocks } from '~/app/cms/blocks-renderer'
import { type ContentQueryQuery } from '~/app/cms/types'

export function PageContent({
	data,
	locale,
}: {
	data: ContentQueryQuery
	locale?: Locale
}) {
	return <Blocks items={data.page.blocks} locale={locale} />
}
