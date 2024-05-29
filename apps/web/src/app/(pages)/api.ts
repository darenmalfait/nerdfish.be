import {
  tina,
  type Blog,
  type ContentQueryQuery,
  type Product,
  type Wiki,
} from '../cms'

export async function getPages() {
  const pageDate = await tina.queries.pageConnection()

  return pageDate.data.pageConnection.edges?.map(item => ({
    ...item?.node,
  }))
}

export function mapPageData(data: ContentQueryQuery) {
  return {
    ...data,
    blogs: data.blogConnection.edges?.map((item: any) => ({
      ...(item?.node ?? {}),
    })) as Blog[],
    wikis: data.wikiConnection.edges?.map((item: any) => ({
      ...(item?.node ?? {}),
    })) as Wiki[],
    products: data.productConnection.edges?.map((item: any) => ({
      ...(item?.node ?? {}),
    })) as Product[],
  }
}

export async function getPage(relativePath: string) {
  const page = await tina.queries
    .contentQuery({
      relativePath,
    })
    .catch(() => null)

  if (!page) return null

  return {
    ...page,
    data: mapPageData(page.data),
  }
}
