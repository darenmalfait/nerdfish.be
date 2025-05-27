import { motion } from 'motion/react'

export interface SpotlightProps {
	gradientFirst?: string
	gradientSecond?: string
	gradientThird?: string
	translateY?: number
	width?: number
	height?: number
	smallWidth?: number
	duration?: number
	xOffset?: number
}

export function Spotlight({
	gradientFirst = 'radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsl(var(--colors-foreground-primary) / 0.1) 0, hsl(var(--colors-foreground-primary) / 0.05) 50%, hsl(var(--colors-foreground-primary) / 0) 80%)',
	gradientSecond = 'radial-gradient(50% 50% at 50% 50%, hsl(var(--colors-foreground-primary) / 0.08) 0, hsl(var(--colors-foreground-primary) / 0.04) 80%, transparent 100%)',
	gradientThird = 'radial-gradient(50% 50% at 50% 50%, hsl(var(--colors-foreground-primary) / 0.06) 0, hsl(var(--colors-foreground-primary) / 0.03) 80%, transparent 100%)',
	translateY = -350,
	width = 560,
	height = 1380,
	smallWidth = 240,
	duration = 7,
	xOffset = 100,
}: SpotlightProps = {}) {
	return (
		<motion.div
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
			}}
			transition={{
				duration: 1.5,
			}}
			className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
		>
			<motion.div
				animate={{
					x: [0, xOffset, 0],
				}}
				transition={{
					duration,
					repeat: Infinity,
					repeatType: 'reverse',
					ease: 'easeInOut',
				}}
				className="pointer-events-none absolute left-0 top-0 z-40 h-screen w-screen"
			>
				<div
					style={{
						transform: `translateY(${translateY}px) rotate(-45deg)`,
						background: gradientFirst,
						width: `${width}px`,
						height: `${height}px`,
					}}
					className="absolute left-0 top-0"
				/>

				<div
					style={{
						transform: 'rotate(-45deg) translate(5%, -50%)',
						background: gradientSecond,
						width: `${smallWidth}px`,
						height: `${height}px`,
					}}
					className="absolute left-0 top-0 origin-top-left"
				/>

				<div
					style={{
						transform: 'rotate(-45deg) translate(-180%, -70%)',
						background: gradientThird,
						width: `${smallWidth}px`,
						height: `${height}px`,
					}}
					className="absolute left-0 top-0 origin-top-left"
				/>
			</motion.div>

			<motion.div
				animate={{
					x: [0, -xOffset, 0],
				}}
				transition={{
					duration,
					repeat: Infinity,
					repeatType: 'reverse',
					ease: 'easeInOut',
				}}
				className="pointer-events-none absolute right-0 top-0 z-40 h-screen w-screen"
			>
				<div
					style={{
						transform: `translateY(${translateY}px) rotate(45deg)`,
						background: gradientFirst,
						width: `${width}px`,
						height: `${height}px`,
					}}
					className="absolute right-0 top-0"
				/>

				<div
					style={{
						transform: 'rotate(45deg) translate(-5%, -50%)',
						background: gradientSecond,
						width: `${smallWidth}px`,
						height: `${height}px`,
					}}
					className="absolute right-0 top-0 origin-top-right"
				/>

				<div
					style={{
						transform: 'rotate(45deg) translate(180%, -70%)',
						background: gradientThird,
						width: `${smallWidth}px`,
						height: `${height}px`,
					}}
					className="absolute right-0 top-0 origin-top-right"
				/>
			</motion.div>
		</motion.div>
	)
}
