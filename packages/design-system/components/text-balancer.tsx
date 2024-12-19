import * as React from 'react'
import { Balancer } from 'react-wrap-balancer'

export function TextBalancer({ children }: { children: React.ReactNode }) {
	return <Balancer>{children}</Balancer>
}
