'use client'

import * as React from 'react'
import { SlowLoading } from './widgets/slow-loading'

const widgetMap = {
	slowLoading: SlowLoading,
} as const

type WidgetType = keyof typeof widgetMap

interface PortableWidgetProps {
	type: WidgetType
}

export function PortableWidget({ type }: PortableWidgetProps) {
	const Widget = widgetMap[type]
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (!Widget) return null

	return <Widget />
}
