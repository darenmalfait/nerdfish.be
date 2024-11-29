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
import { Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { useTheme } from '../theme-provider'

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
							isDarkMode ? (
								<Sun className="size-4" />
							) : (
								<Moon className="size-4" />
							)
						) : (
							<LoadingAnimation variant="classic" className="size-4" />
						)}
						<div className="sr-only">{isDarkMode ? 'Light' : 'Dark'} Mode</div>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={() => setTheme('light')}>
						{t('light')}
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme('dark')}>
						{t('dark')}
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme('system')}>
						{t('system')}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
)
ThemeToggle.displayName = 'ThemeToggle'

export { ThemeToggle }
