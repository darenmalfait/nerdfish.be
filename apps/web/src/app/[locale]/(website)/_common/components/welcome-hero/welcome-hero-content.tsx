import { Button } from '@nerdfish/react/button'
import { Logo } from '@repo/design-system/icons'
import { cn } from '@repo/lib/utils/class'
import { Link } from '~/app/[locale]/_common/components/link'

export function WelcomeHeroContactButton({ label }: { label: string }) {
	return (
		<Button
			variant="accent"
			size="xl"
			render={<Link href="/contact">{label}</Link>}
		/>
	)
}

export type WelcomeHeroContentProps = {
	subtitle: string
	ctaLabel: string
	className?: string
}

const bars = [
	{
		className: 'top-0 h-[35%] bg-accent animate-welcome-hero-slice-right',
	},
	{
		className:
			'top-[35%] h-[30%] bg-foreground animate-welcome-hero-slice-left animation-delay-100',
	},
	{
		className:
			'top-[65%] h-[35%] bg-accent animate-welcome-hero-slice-right animation-delay-200',
	},
] as const

function LogoWithBars() {
	return (
		<div className="relative w-full max-w-7xl overflow-hidden">
			<div className="animate-welcome-hero-logo">
				<Logo className="text-foreground h-auto w-full" aria-hidden />
			</div>

			{bars.map((bar, i) => (
				<div
					key={i}
					aria-hidden
					className={cn(
						'pointer-events-none absolute inset-x-0 z-10 w-full',
						bar.className,
					)}
				/>
			))}
		</div>
	)
}

export function WelcomeHeroContent({
	subtitle,
	ctaLabel,
	className,
}: WelcomeHeroContentProps) {
	return (
		<div
			className={cn(
				'bg-background-muted relative flex h-full w-full flex-1 flex-col items-center justify-center',
				className,
			)}
		>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 opacity-[0.05]"
				style={{
					backgroundImage:
						'linear-gradient(to right, var(--color-foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--color-foreground) 1px, transparent 1px)',
					backgroundSize: 'clamp(20px, 5vw, 60px) clamp(20px, 5vw, 60px)',
				}}
			/>

			<div className="gap-acquaintances px-friends relative z-10 flex w-full translate-y-[-8vh] flex-col items-center">
				<h1 className="sr-only">nerdfish</h1>
				<div className="flex w-full items-center justify-center">
					<LogoWithBars />
				</div>
				<p className="text-foreground-muted px-friends typography-body-small max-w-lg text-center uppercase">
					{subtitle}
				</p>
			</div>

			<div className="bottom-acquaintances absolute z-20 flex justify-center">
				<WelcomeHeroContactButton label={ctaLabel} />
			</div>

			<div
				aria-hidden
				className="border-border top-casual left-casual size-casual absolute border-t border-l"
			/>
			<div
				aria-hidden
				className="border-border right-casual bottom-casual size-casual absolute border-r border-b"
			/>
		</div>
	)
}
