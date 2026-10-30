import { type ElementType, type ReactNode } from 'react'

import { type ArrowIconProps } from '../icons'

export interface ArrowLinkProps {
	className?: string
	direction?: ArrowIconProps['direction']
	href?: string
	children: ReactNode
	as?: ElementType
}

type ArrowLinkLabelProps = Pick<ArrowLinkProps, 'children' | 'direction'>

function isLeadingDirection(direction: ArrowLinkProps['direction'] = 'right') {
	return direction === 'right' || direction === 'up'
}

export function ArrowLinkLeadingLabel({
	children,
	direction,
}: ArrowLinkLabelProps) {
	if (!children || !isLeadingDirection(direction)) return null

	return <span className="mr-lg font-bold">{children}</span>
}

export function ArrowLinkTrailingLabel({
	children,
	direction,
}: ArrowLinkLabelProps) {
	if (!children || isLeadingDirection(direction)) return null

	return <span className="ml-casual text-xl font-bold">{children}</span>
}
