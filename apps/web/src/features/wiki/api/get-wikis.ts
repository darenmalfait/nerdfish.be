import { allWikis } from 'content-collections'

import { byDateDesc } from '~/utils/by-date-desc'

export async function getWikis() {
	return allWikis.toSorted(byDateDesc)
}
