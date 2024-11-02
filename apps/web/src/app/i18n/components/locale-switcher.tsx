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

export function LocaleSwitcher() {
	const { currentLocale } = useTranslation()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					aria-label="Switch Language"
					className="gap-2"
				>
					<GlobeIcon className="size-4" />
					{supportedLanguages.find((l) => l.code === currentLocale)?.label}
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
