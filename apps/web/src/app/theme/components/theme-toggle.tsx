'use client'

import {
	Button,
	type ButtonProps,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	LoadingAnimation,
} from '@nerdfish/ui'
import { LaptopIcon, MoonIcon, SunIcon } from '@repo/ui/icons'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { useTheme } from '../theme-provider'

const iconMap = {
	light: SunIcon,
	dark: MoonIcon,
	system: LaptopIcon,
}

const ThemeToggle = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ variant, asChild, size, className, ...props }, ref) => {
		const t = useTranslations('theme')
		const [mounted, setMounted] = React.useState(false)
		const { theme, setTheme, systemTheme } = useTheme()

		// useEffect only runs on the client, so now we can safely show the UI
		React.useEffect(() => {
			setMounted(true)
		}, [])

		const isDarkMode =
			theme === 'dark' || (theme === 'system' && systemTheme === 'dark')

		const Icon = iconMap[isDarkMode ? 'dark' : 'light']

		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						ref={ref}
						type="button"
						size="icon"
						variant={variant ?? 'ghost'}
						disabled={!mounted}
						{...props}
						className={className}
					>
						{mounted ? (
							<Icon className="size-4" />
						) : (
							<LoadingAnimation variant="classic" className="size-4" />
						)}
						<div className="sr-only">
							{isDarkMode ? t('light') : t('dark')} Mode
						</div>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="p-xs">
					<DropdownMenuItem onClick={() => setTheme('light')}>
						<SunIcon className="mr-sm size-4" /> {t('light')}
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme('dark')}>
						<MoonIcon className="mr-sm size-4" /> {t('dark')}
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme('system')}>
						<LaptopIcon className="mr-sm size-4" /> {t('system')}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
)
ThemeToggle.displayName = 'ThemeToggle'

export { ThemeToggle }
