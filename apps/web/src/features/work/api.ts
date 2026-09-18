import { allProjects, type Project } from 'content-collections'
import { LocalizedContentService } from '~/features/shared/content/content-service'

export class WorkContentService extends LocalizedContentService<Project> {
	constructor() {
		super(allProjects)
	}
}

export const work = new WorkContentService()
