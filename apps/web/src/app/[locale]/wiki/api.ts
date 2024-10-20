import { tina } from '../../cms'

export async function getWikiPosts() {
	const wikiListData = await tina.queries.wikiConnection()

	return wikiListData.data.wikiConnection.edges?.map((item) => ({
		...item?.node,
	}))
}

export async function getWikiPost(relativePath: string) {
	return tina.queries
		.wikiQuery({
			relativePath,
		})
		.catch(() => null)
}
