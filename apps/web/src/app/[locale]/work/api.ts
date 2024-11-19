import { tina } from '../../cms'
import { type Locale } from '~/app/i18n'

export async function getWorks({ locale }: { locale?: Locale } = {}) {
	const workListData = await tina.queries.workConnection()

	return workListData.data.workConnection.edges
		?.map((item) => ({
			...item?.node,
		}))
		.filter((item) =>
			locale ? item._sys?.relativePath.startsWith(`${locale}/`) : true,
		)
		.reverse()
}

export async function getWork(relativePath: string) {
	return tina.queries
		.workQuery({
			relativePath,
		})
		.catch(() => null)
}
