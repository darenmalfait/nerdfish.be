import { matchSorter, rankings as matchSorterRankings } from 'match-sorter'

import type { WikiPage } from '../api'

export function filterWikiPages(wikiPages: WikiPage[], searchString: string) {
  if (!searchString) return wikiPages

  const options = {
    keys: [
      {
        key: 'title',
        threshold: matchSorterRankings.CONTAINS,
      },
      {
        key: 'tags.*',
        threshold: matchSorterRankings.CONTAINS,
        maxRanking: matchSorterRankings.CONTAINS,
      },
    ],
  }

  const allResults = matchSorter(wikiPages, searchString, options)
  const searches = new Set(searchString.split(' '))
  if (searches.size < 2) {
    // if there's only one word then we're done
    return allResults
  }

  // if there are multiple words, we'll conduct an individual search for each word
  const [firstWord, ...restWords] = searches.values()
  if (!firstWord) {
    // this should be impossible, but if it does happen, we'll just return an empty array
    return []
  }

  const individualWordOptions = {
    ...options,
    keys: options.keys.map(key => {
      return {
        ...key,
        maxRanking: matchSorterRankings.CASE_SENSITIVE_EQUAL,
        threshold: matchSorterRankings.WORD_STARTS_WITH,
      }
    }),
  }

  // go through each word and further filter the results
  let individualWordResults = matchSorter(
    wikiPages,
    firstWord,
    individualWordOptions,
  )
  for (const word of restWords) {
    const searchResult = matchSorter(
      individualWordResults,
      word,
      individualWordOptions,
    )
    individualWordResults = individualWordResults.filter(r =>
      searchResult.includes(r),
    )
  }

  return Array.from(new Set([...allResults, ...individualWordResults]))
}
