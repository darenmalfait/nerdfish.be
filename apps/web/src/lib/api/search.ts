import {
  type MultipleQueriesQuery,
  type SearchOptions,
} from '@algolia/client-search'
import algoliasearch from 'algoliasearch/lite'

import {env} from '~/env.mjs'

const appId = env.NEXT_PUBLIC_ALGOLIA_APP_ID
const apiKey = env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY

interface Request {
  params: SearchOptions
}

export type SearchRequest = Request & MultipleQueriesQuery

function getAlgoliaClient(): {
  algoliaClient: ReturnType<typeof algoliasearch>
  search: (requests: SearchRequest[]) => Promise<any>
  searchForFacetValues: (requests: any) => Promise<any>
} {
  const algoliaClient = algoliasearch(appId, apiKey)

  return {
    algoliaClient,
    async search(requests: SearchRequest[]) {
      if (requests.every(({params: {query}}) => !Boolean(query))) {
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

export {getAlgoliaClient}
