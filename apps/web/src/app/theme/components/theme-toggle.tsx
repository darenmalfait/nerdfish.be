'use client'

import { Button } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { LaptopIcon, MoonIcon, SunIcon } from '@repo/ui/icons'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { useTheme } from '../theme-provider'

export const ThemeToggle = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const t = useTranslations('theme')
	const { theme, setTheme } = useTheme()

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
			<Button
				role="radio"
				size="iconSm"
				variant={theme === 'light' ? 'secondary' : 'ghost'}
				onClick={() => setTheme('light')}
				aria-checked={theme === 'light'}
				aria-label={t('setTheme', { theme: t('light') })}
				value="light"
			>
				<SunIcon className="size-4" />
			</Button>
			<Button
				role="radio"
				size="iconSm"
				variant={theme === 'system' ? 'secondary' : 'ghost'}
				aria-checked={theme === 'system'}
				aria-label={t('setTheme', { theme: t('system') })}
				onClick={() => setTheme('system')}
				value="system"
			>
				<LaptopIcon className="size-4" />
			</Button>
			<Button
				role="radio"
				size="iconSm"
				variant={theme === 'dark' ? 'secondary' : 'ghost'}
				aria-checked={theme === 'dark'}
				aria-label={t('setTheme', { theme: t('dark') })}
				onClick={() => setTheme('dark')}
				value="dark"
			>
				<MoonIcon className="size-4" />
			</Button>
		</div>
	)
})
ThemeToggle.displayName = 'ThemeToggle'
