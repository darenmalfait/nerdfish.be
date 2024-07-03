import { mapPageData } from '../api'
import { Blocks, type ContentQueryQuery, type PageBlocks } from '~/app/cms'

export function PageContent({ data }: { data: ContentQueryQuery }) {
	return (
		<Blocks
			items={data.page.blocks as PageBlocks[]}
			globalData={{ ...mapPageData(data) }}
		/>
	)
}
