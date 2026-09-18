import { allWikis, type Wiki } from 'content-collections'
import { SingleLocaleContentService } from '~/features/shared/content/content-service'

export class WikiContentService extends SingleLocaleContentService<Wiki> {
	constructor() {
		super(allWikis)
	}
}

export const wiki = new WikiContentService()
