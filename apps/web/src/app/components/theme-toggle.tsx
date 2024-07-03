'use client'

import { Button, type ButtonProps } from '@nerdfish/ui'
import { Moon, Sun } from 'lucide-react'
import * as React from 'react'

import { useTheme } from '~/app/theme-provider'

const ThemeToggle = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ variant, asChild, size, className, ...props }, ref) => {
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
			<Button
				ref={ref}
				type="button"
				size="icon"
				variant={variant ?? 'ghost'}
				{...props}
				className={className}
				onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
			>
				{isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
				<div className="sr-only">{isDarkMode ? `Light` : `Dark`} Mode</div>
			</Button>
		)
	},
)
ThemeToggle.displayName = 'ThemeToggle'

export { ThemeToggle }
