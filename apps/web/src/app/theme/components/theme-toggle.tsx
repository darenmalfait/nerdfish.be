'use client'

import { Button } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { LaptopIcon, MoonIcon, SunIcon } from '@repo/ui/icons'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { useTheme } from '../theme-provider'

const ThemeToggleItem = React.forwardRef<
	HTMLButtonElement,
	Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'> & {
		isActive: boolean
		value: string
		onClick?: (value: string) => void
	}
>(({ className, isActive, value, onClick, ...props }, ref) => {
	return (
		<Button
			role="radio"
			size="iconSm"
			aria-checked={isActive}
			variant={isActive ? 'secondary' : 'ghost'}
			ref={ref}
			onClick={() => onClick?.(value)}
			{...props}
		/>
	)
})
ThemeToggleItem.displayName = 'ThemeToggleItem'

export const ThemeToggle = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const t = useTranslations('theme')
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = React.useState<boolean>(false)

	React.useEffect(() => {
		setMounted(true)
	}, [])

	return (
		<div
			ref={ref}
			role="radiogroup"
			{...props}
			className={cx(
				'shadow-outline p-xs gap-xs rounded-container flex items-center',
				className,
			)}
		>
			<ThemeToggleItem
				isActive={mounted ? theme === 'light' : false}
				onClick={setTheme}
				aria-label={t('setTheme', { theme: t('light') })}
				value="light"
			>
				<SunIcon className="size-4" />
			</ThemeToggleItem>
			<ThemeToggleItem
				isActive={mounted ? theme === 'system' : false}
				aria-label={t('setTheme', { theme: t('system') })}
				onClick={setTheme}
				value="system"
			>
				<LaptopIcon className="size-4" />
			</ThemeToggleItem>
			<ThemeToggleItem
				isActive={mounted ? theme === 'dark' : false}
				onClick={setTheme}
				aria-label={t('setTheme', { theme: t('dark') })}
				value="dark"
			>
				<MoonIcon className="size-4" />
			</ThemeToggleItem>
		</div>
	)
})
ThemeToggle.displayName = 'ThemeToggle'
