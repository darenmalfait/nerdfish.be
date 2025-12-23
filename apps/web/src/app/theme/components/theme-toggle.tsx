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
import { cn, cva, type VariantProps } from '@repo/lib/utils/class'
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
	border,
	...props
}: Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> & {
	isActive: boolean
	value: string
	onClick?: (value: string) => void
	border: VariantProps<typeof themeToggleVariants>['border']
}) {
	return (
		<Button
			role="radio"
			size="sm"
			icon
			aria-checked={isActive}
			variant={isActive ? 'default' : 'ghost'}
			className={cn(
				{
					'rounded-[calc(var(--radius-base)-theme(padding.bff))]!': !!border,
					'opacity-60 hover:opacity-100': !isActive,
				},
				className,
			)}
			onClick={() => onClick?.(value)}
			{...props}
		/>
	)
}

const themeToggleVariants = cva(
	'gap-bff rounded-base border-border z-10 flex items-center border',
	{
		variants: {
			border: {
				true: 'border p-bff',
				false: 'border-none',
			},
		},
		defaultVariants: {
			border: true,
		},
	},
)

export function ThemeToggle({
	className,
	border = true,
	...props
}: ComponentProps<'div'> & VariantProps<typeof themeToggleVariants>) {
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
				className={cn(themeToggleVariants({ border }), className)}
			>
				<Tooltip>
					<TooltipTrigger
						render={
							<ThemeToggleItem
								isActive={mounted ? theme === 'system' : false}
								aria-label={t('setTheme', { theme: t('system') })}
								onClick={setTheme}
								value="system"
								border={border}
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
								border={border}
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
								border={border}
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
