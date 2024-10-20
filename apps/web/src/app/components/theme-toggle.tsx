'use client'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	type ButtonProps,
} from '@nerdfish/ui'
import { Moon, Sun } from 'lucide-react'
import * as React from 'react'

import { useTranslation } from '../[locale]/translation-provider'
import { useTheme } from '~/app/theme-provider'

const ThemeToggle = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ variant, asChild, size, className, ...props }, ref) => {
		const { t } = useTranslation()
		const [mounted, setMounted] = React.useState(false)
		const { theme, setTheme, systemTheme } = useTheme()

		// useEffect only runs on the client, so now we can safely show the UI
		React.useEffect(() => {
			setMounted(true)
		}, [])

		if (!mounted) {
			return null
		}

		const isDarkMode =
			theme === 'dark' || (theme === 'system' && systemTheme === 'dark')

		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						ref={ref}
						type="button"
						size="icon"
						variant={variant ?? 'ghost'}
						{...props}
						className={className}
					>
						{isDarkMode ? (
							<Sun className="size-4" />
						) : (
							<Moon className="size-4" />
						)}
						<div className="sr-only">{isDarkMode ? `Light` : `Dark`} Mode</div>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={() => setTheme('light')}>
						{t('theme.light')}
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme('dark')}>
						{t('theme.dark')}
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme('system')}>
						{t('theme.system')}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	},
)
ThemeToggle.displayName = 'ThemeToggle'

export { ThemeToggle }
