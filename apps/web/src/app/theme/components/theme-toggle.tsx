'use client'

import { Button } from '@nerdfish/react/button'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@nerdfish/react/tooltip'
import { LaptopIcon, MoonIcon, SunIcon } from '@repo/design-system/icons'
import { useTranslations } from '@repo/i18n/client'
import { cx } from '@repo/lib/utils/base'
import { forwardRef, type HTMLAttributes, useEffect, useState } from 'react'
import { useTheme } from '../theme-provider'

const ThemeToggleItem = forwardRef<
	HTMLButtonElement,
	Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> & {
		isActive: boolean
		value: string
		onClick?: (value: string) => void
	}
>(({ className, isActive, value, onClick, ...props }, ref) => {
	return (
		<Button
			role="radio"
			size="sm"
			icon
			aria-checked={isActive}
			variant={isActive ? 'secondary' : 'ghost'}
			ref={ref}
			className={cx(
				'rounded-[calc(var(--radius-base)-theme(padding.bff))]!',
				{
					'opacity-60 hover:opacity-100': !isActive,
				},
				className,
			)}
			onClick={() => onClick?.(value)}
			{...props}
		/>
	)
})
ThemeToggleItem.displayName = 'ThemeToggleItem'

export const ThemeToggle = forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const t = useTranslations('theme')
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState<boolean>(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	return (
		<TooltipProvider>
			<div
				ref={ref}
				role="radiogroup"
				aria-label={t('changeTheme')}
				{...props}
				className={cx(
					'border-border p-bff gap-bff rounded-base flex items-center border',
					className,
				)}
			>
				<Tooltip>
					<TooltipTrigger
						render={
							<ThemeToggleItem
								isActive={mounted ? theme === 'system' : false}
								aria-label={t('setTheme', { theme: t('system') })}
								onClick={setTheme}
								value="system"
							>
								<LaptopIcon />
							</ThemeToggleItem>
						}
					/>
					<TooltipContent>
						<p>{t('system')}</p>
					</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger
						render={
							<ThemeToggleItem
								isActive={mounted ? theme === 'light' : false}
								onClick={setTheme}
								aria-label={t('setTheme', { theme: t('light') })}
								value="light"
							>
								<SunIcon />
							</ThemeToggleItem>
						}
					/>
					<TooltipContent>
						<p>{t('light')}</p>
					</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger
						render={
							<ThemeToggleItem
								isActive={mounted ? theme === 'dark' : false}
								onClick={setTheme}
								aria-label={t('setTheme', { theme: t('dark') })}
								value="dark"
							>
								<MoonIcon />
							</ThemeToggleItem>
						}
					/>
					<TooltipContent>
						<p>{t('dark')}</p>
					</TooltipContent>
				</Tooltip>
			</div>
		</TooltipProvider>
	)
})
ThemeToggle.displayName = 'ThemeToggle'
