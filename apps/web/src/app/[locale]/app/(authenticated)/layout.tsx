import { SidebarProvider } from '@nerdfish/react/sidebar'
import { auth, currentUser } from '@repo/auth/server'
import { type ReactNode } from 'react'
import { AppSidebar } from '../components/app-sidebar'

export default async function AppLayout({
	children,
}: {
	readonly children: ReactNode
}) {
	const user = await currentUser()
	const { redirectToSignIn } = await auth()

	if (!user) {
		return redirectToSignIn()
	}

	return (
		<SidebarProvider>
			<AppSidebar>{children}</AppSidebar>
		</SidebarProvider>
	)
}
