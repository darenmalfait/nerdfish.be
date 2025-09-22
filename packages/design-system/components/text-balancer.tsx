import { type ReactNode } from 'react'
import { Balancer } from 'react-wrap-balancer'

export function TextBalancer({ children }: { children: ReactNode }) {
	return <Balancer>{children}</Balancer>
}
