import { createNavigation } from 'next-intl/navigation'
import { i18n } from './config'

export const { usePathname, useRouter } = createNavigation({
	locales: i18n.locales,
})
