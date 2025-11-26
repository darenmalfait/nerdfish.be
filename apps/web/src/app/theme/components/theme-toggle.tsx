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
import { cn } from '@repo/lib/utils/class'
import {
	type ComponentProps,
	type HTMLAttributes,
	useEffect,
	useState,
} from 'react'
import { useTheme } from '../theme-provider'

function ThemeToggleItem({
	className,
	isActive,
	value,
	onClick,
	...props
}: Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> & {
	isActive: boolean
	value: string
	onClick?: (value: string) => void
}) {
	return (
		<Button
			role="radio"
			size="xs"
			icon
			aria-checked={isActive}
			variant={isActive ? 'default' : 'ghost'}
			className={cn(
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
}

export function ThemeToggle({ className, ...props }: ComponentProps<'div'>) {
	const t = useTranslations('theme')
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState<boolean>(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	return (
		<TooltipProvider>
			<div
				role="radiogroup"
				aria-label={t('changeTheme')}
				{...props}
				className={cn(
					'p-bff gap-bff rounded-base border-border z-10 flex items-center border',
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
}
