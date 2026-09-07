import { cn } from '@repo/lib/utils/class'
import { type ComponentProps } from 'react'

/** Default blob colors — override via `global.css` `--welcome-aurora-*` tokens. */
export const WELCOME_HERO_AURORA_COLORS = {
	left: 'var(--welcome-aurora-left, var(--color-accent))',
	center: 'var(--welcome-aurora-center, var(--color-info))',
	right: 'var(--welcome-aurora-right, var(--color-success))',
} as const

function auroraBackground(left: string, center: string, right: string): string {
	return [
		`radial-gradient(circle 250px at 8% 18%, ${left}, transparent 70%)`,
		`radial-gradient(circle 230px at 50% 12%, ${center}, transparent 70%)`,
		`radial-gradient(circle 290px at 88% 22%, ${right}, transparent 70%)`,
	].join(', ')
}

export type WelcomeHeroAuroraProps = ComponentProps<'div'> & {
	left?: string
	center?: string
	right?: string
}

/**
 * Blurred aurora glow behind the welcome hero — same technique as Astryx's
 * HeroReelCards backdropGlow, wired to nerdfish Tailwind semantic colors.
 */
export function WelcomeHeroAurora({
	className,
	left = WELCOME_HERO_AURORA_COLORS.left,
	center = WELCOME_HERO_AURORA_COLORS.center,
	right = WELCOME_HERO_AURORA_COLORS.right,
	...props
}: WelcomeHeroAuroraProps) {
	return (
		<div
			aria-hidden
			className={cn(
				'-top-site-header pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden',
				className,
			)}
			{...props}
		>
			<div
				className={cn(
					'top-site-header absolute left-1/2 h-full w-full max-w-300 -translate-x-1/2',
					'opacity-62 blur-[70px] motion-reduce:opacity-40',
				)}
				style={{
					backgroundImage: auroraBackground(left, center, right),
				}}
			/>
		</div>
	)
}
