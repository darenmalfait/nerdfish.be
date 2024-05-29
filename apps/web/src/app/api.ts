import {tina} from './cms'

export async function getGlobalData() {
  const globalData = await tina.queries.globalQuery()

  return globalData.data.global
}

export async function getSitemapData() {
  const {data} = await tina.queries.sitemapQuery()
  return {
    pages: data.pageConnection.edges?.map(item => ({
      ...item?.node,
    })),
    blogs: data.blogConnection.edges
      ?.map(item => ({
        ...item?.node,
      }))
      .reverse(),
    wikis: data.wikiConnection.edges
      ?.map(item => ({
        ...item?.node,
      }))
      .reverse(),
  }
}
