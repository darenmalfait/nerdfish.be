'use client'

import { Button } from '@nerdfish/react/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@nerdfish/react/dropdown-menu'
import { GlobeIcon } from '@repo/design-system/icons'
import { i18n, supportedLanguages } from '@repo/i18n/config'
import { cn } from '@repo/lib/utils/class'
import { useLocale, useTranslations } from 'next-intl'
import { type ComponentProps } from 'react'
import { basePathNames, usePathname, useRouter } from 'routing'

type SharedPathname = keyof typeof basePathNames

function getLocaleSwitchHref(pathname: string): SharedPathname {
	if (pathname in basePathNames) {
		return pathname as SharedPathname
	}

	// Content like /blog/:slug isn't 1:1 across locales — drop to the section root
	const section = Object.keys(basePathNames)
		.filter((route) => route !== '/' && pathname.startsWith(`${route}/`))
		.sort((a, b) => b.length - a.length)[0]

	return (section as SharedPathname | undefined) ?? '/'
}

export function LocaleSwitcher({
	className,
	variant = 'outline',
	...props
}: ComponentProps<typeof Button>) {
	const t = useTranslations('global')
	const currentLocale = useLocale()
	const pathname = usePathname()
	const router = useRouter()

	const selectedLanguage = supportedLanguages.find(
		(l) => l.code === currentLocale,
	)

	function switchLocale(locale: string) {
		router.replace(getLocaleSwitchHref(pathname), { locale })
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button
						variant={variant}
						aria-label={t('switchLanguage')}
						className={cn('gap-best-friends', className)}
						{...props}
					>
						<GlobeIcon className="size-4" />
						<span aria-hidden className="hidden lg:flex">
							{selectedLanguage?.label}
						</span>
						<span aria-hidden className="lg:hidden">
							{selectedLanguage?.code}
						</span>
					</Button>
				}
			/>
			<DropdownMenuContent>
				<ul>
					{i18n.locales.map((locale) => {
						return (
							<li key={locale}>
								<DropdownMenuItem
									className="cursor-pointer"
									disabled={locale === currentLocale}
									onClick={() => switchLocale(locale)}
								>
									{supportedLanguages.find((l) => l.code === locale)?.label}
								</DropdownMenuItem>
							</li>
						)
					})}
				</ul>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
