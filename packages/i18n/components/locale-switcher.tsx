'use client'

import { Button } from '@nerdfish/react/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@nerdfish/react/dropdown-menu'
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
			<DropdownMenuTrigger
				render={
					<Button
						variant="secondary"
						aria-label={t('switchLanguage')}
						className={cx(
							'gap-best-friends border-border! bg-background! hover:bg-background-muted!',
							className,
						)}
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
								<DropdownMenuItem>
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
