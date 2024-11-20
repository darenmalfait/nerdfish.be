import { Button } from '@nerdfish/ui'
import * as React from 'react'
import { Magnet } from './magnet'

export const MagnetButton = React.forwardRef<
	React.ElementRef<typeof Button>,
	React.ComponentPropsWithoutRef<typeof Button>
>(({ children, ...props }, ref) => {
	return (
		<Magnet>
			<Button ref={ref} {...props}>
				{children}
			</Button>
		</Magnet>
	)
})

MagnetButton.displayName = 'MagnetButton'
