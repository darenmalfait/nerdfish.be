import { SidebarProvider } from '@nerdfish/react/sidebar'
import { auth, currentUser } from '@repo/auth/server'
import { type ReactNode } from 'react'
import { AppSidebar } from '../components/app-sidebar'
import { NuqsProvider } from '~/app/[locale]/_common/components/nuqs-provider'

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
		<NuqsProvider>
			<SidebarProvider>
				<AppSidebar>{children}</AppSidebar>
			</SidebarProvider>
		</NuqsProvider>
	)
}
