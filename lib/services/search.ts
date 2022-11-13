import type {
  SearchOptions,
  MultipleQueriesQuery,
} from '@algolia/client-search'
import algoliasearch from 'algoliasearch/lite'

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ''
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || ''

interface Request {
  params: SearchOptions
}

export type SearchRequest = Request & MultipleQueriesQuery

function getAlgoliaClient() {
  const algoliaClient = algoliasearch(appId, apiKey)

  return {
    algoliaClient,
    async search(requests: SearchRequest[]) {
      if (requests.every(({ params: { query } }) => Boolean(query) === false)) {
        return {
          results: requests.map(() => {
            return {
              processingTimeMS: 0,
              nbHits: 0,
              hits: [],
              facets: {},
            }
          }),
        }
      }

      return algoliaClient.search(requests)
    },
    async searchForFacetValues(requests: any) {
      return algoliaClient.searchForFacetValues(requests)
    },
  }
}

export { getAlgoliaClient }
