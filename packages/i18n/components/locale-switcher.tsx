'use client'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@repo/design-system/components/ui'
import { GlobeIcon } from '@repo/design-system/icons'
import { cx } from '@repo/lib/utils/base'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { i18n, supportedLanguages } from '../config'

export function LocaleSwitcher({ className }: { className?: string }) {
	const t = useTranslations('global')
	const currentLocale = useLocale()

	const selectedLanguage = supportedLanguages.find(
		(l) => l.code === currentLocale,
	)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					aria-label={t('switchLanguage')}
					className={cx('gap-sm !rounded-base', className)}
				>
					<GlobeIcon className="size-4" />
					<span aria-hidden className="hidden lg:flex">
						{selectedLanguage?.label}
					</span>
					<span aria-hidden className="lg:hidden">
						{selectedLanguage?.code}
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="rounded-base bg-background-muted !p-md">
				<ul>
					{i18n.locales.map((locale) => {
						return (
							<li key={locale}>
								<DropdownMenuItem className="hover:!bg-background !rounded-[calc(theme(borderRadius.base)-theme(padding.md))]">
									<Link
										href={`/${locale}`}
										lang={locale}
										locale={locale}
										hrefLang={locale}
									>
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
