import { type Locale } from '@repo/i18n/types'
import { BlogPath as blog } from './blog/utils'
import { ContactPath as contact } from './contact/utils'
import { WikiPath as wiki } from './wiki/utils'
import { WorkPath as work } from './work/utils'

const paths = {
	blog,
	contact,
	work,
	wiki,
}

export function getLocalizedPath(type: keyof typeof paths, locale: Locale) {
	return paths[type][locale]
}
