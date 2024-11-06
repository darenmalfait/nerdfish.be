'use client'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@nerdfish/ui'
import { GlobeIcon } from '@nerdfish-website/ui/icons'
import Link from 'next/link'
import { i18n, supportedLanguages } from '../i18n-config'
import { useTranslation } from './translation-provider'

export function LocaleSwitcher({ compact }: { compact?: boolean }) {
	const { currentLocale } = useTranslation()

	const selectedLanguage = supportedLanguages.find(
		(l) => l.code === currentLocale,
	)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					aria-label="Switch Language"
					className="gap-sm"
				>
					<GlobeIcon className="size-4" />
					{compact ? selectedLanguage?.code : selectedLanguage?.label}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<ul>
					{i18n.locales.map((locale) => {
						return (
							<li key={locale}>
								<DropdownMenuItem>
									<Link href={`/${locale}`}>
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
