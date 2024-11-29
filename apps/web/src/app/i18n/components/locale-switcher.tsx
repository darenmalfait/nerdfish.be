'use client'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@nerdfish/ui'
import { GlobeIcon } from '@repo/ui/icons'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { i18n, supportedLanguages } from '../config'

export function LocaleSwitcher() {
	const t = useTranslations('global')
	const currentLocale = useLocale()

	const selectedLanguage = supportedLanguages.find(
		(l) => l.code === currentLocale
	)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					aria-label={t('switchLanguage')}
					className="gap-sm"
				>
					<GlobeIcon className="size-4" />
					<span aria-hidden className="hidden lg:block">
						{selectedLanguage?.label}
					</span>
					<span aria-hidden className="lg:hidden">
						{selectedLanguage?.code}
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-xs">
				<ul>
					{i18n.locales.map((locale) => {
						return (
							<li key={locale}>
								<DropdownMenuItem>
									<Link href={`/${locale}`} lang={locale} hrefLang={locale}>
										{supportedLanguages.find((l) => l.code === locale)?.label}
									</Link>
								</DropdownMenuItem>
							</li>
						)
					})}
				</ul>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
