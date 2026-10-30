import { type Project } from 'content-collections'

const WORK_LAYOUT_BY_CATEGORY = {
	webdesign: 'sidebar',
	branding: 'full',
	print: 'full',
	product: 'full',
} as const satisfies Record<Project['category'], 'sidebar' | 'full'>

export type WorkLayout =
	(typeof WORK_LAYOUT_BY_CATEGORY)[keyof typeof WORK_LAYOUT_BY_CATEGORY]

export function getWorkLayout(category: Project['category']): WorkLayout {
	return WORK_LAYOUT_BY_CATEGORY[category]
}
