import { cn } from '@repo/lib/utils/class'
import { GeistMono } from 'geist/font/mono'
import localFont from 'next/font/local'

// Font files can be colocated inside of `pages`
const NebulaSans = localFont({
	src: [
		{
			path: './fonts/NebulaSans-Light.woff2',
			weight: '300',
			style: 'normal',
		},
		{
			path: './fonts/NebulaSans-Book.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: './fonts/NebulaSans-Medium.woff2',
			weight: '500',
			style: 'normal',
		},
		{
			path: './fonts/NebulaSans-Semibold.woff2',
			weight: '600',
			style: 'normal',
		},
		{
			path: './fonts/NebulaSans-Bold.woff2',
			weight: '700',
			style: 'normal',
		},
		{
			path: './fonts/NebulaSans-Black.woff2',
			weight: '900',
			style: 'normal',
		},
	],
	variable: '--font-nebula-sans',
})

export const fonts = cn(
	NebulaSans.variable,
	GeistMono.variable,
	'touch-manipulation font-sans antialiased',
)
