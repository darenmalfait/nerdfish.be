import { cx } from '@repo/lib/utils/base'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

export const fonts = cx(
	GeistSans.variable,
	GeistMono.variable,
	'touch-manipulation font-sans antialiased',
)
