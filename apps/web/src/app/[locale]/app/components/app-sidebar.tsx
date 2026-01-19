'use client'

import { Button } from '@nerdfish/react/button'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@nerdfish/react/collapsible'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	useSidebar,
} from '@nerdfish/react/sidebar'
import { UserButton } from '@repo/auth/client'
import { Logo } from '@repo/design-system/icons'
import { cn } from '@repo/lib/utils/class'
import { ChevronRightIcon, SquareTerminalIcon } from 'lucide-react'
import Link from 'next/link'
import { type ReactNode } from 'react'

type AppSidebarProperties = {
	readonly children: ReactNode
}

const data = {
	navMain: [
		{
			title: 'Dashboard',
			url: '#',
			icon: SquareTerminalIcon,
			isActive: true,
			items: [
				{
					title: 'Timesheets',
					url: '/app/timesheets',
				},
				{
					title: 'Resume',
					url: '/app/resume',
				},
			],
		},
	],
}

export function AppSidebar({ children }: AppSidebarProperties) {
	const sidebar = useSidebar()

	return (
		<>
			<Sidebar variant="inset" className="bg-background-muted print:hidden">
				<SidebarHeader className="bg-background-muted justify-start">
					<Button
						render={
							<Link
								href="/app"
								aria-label="Home"
								className="w-fit justify-start"
							>
								<Logo className="h-6 w-auto fill-white" />
							</Link>
						}
						variant="link"
						className="-mx-best-friends text-foreground group/header-logo relative"
					/>
				</SidebarHeader>
				<SidebarContent className="bg-background-muted">
					<SidebarGroup>
						<SidebarGroupLabel>Platform</SidebarGroupLabel>
						<SidebarMenu>
							{data.navMain.map((item) => (
								<Collapsible
									render={
										<SidebarMenuItem>
											<SidebarMenuButton
												tooltip={item.title}
												render={
													<Link href={item.url}>
														<item.icon />
														<span>{item.title}</span>
													</Link>
												}
											/>
											{item.items.length ? (
												<>
													<CollapsibleTrigger
														render={
															<SidebarMenuAction className="data-[state=open]:rotate-90">
																<ChevronRightIcon />
																<span className="sr-only">Toggle</span>
															</SidebarMenuAction>
														}
													/>
													<CollapsibleContent>
														<SidebarMenuSub>
															{item.items.map((subItem) => (
																<SidebarMenuSubItem key={subItem.title}>
																	<SidebarMenuSubButton
																		render={
																			<Link href={subItem.url}>
																				<span>{subItem.title}</span>
																			</Link>
																		}
																	/>
																</SidebarMenuSubItem>
															))}
														</SidebarMenuSub>
													</CollapsibleContent>
												</>
											) : null}
										</SidebarMenuItem>
									}
									defaultOpen={item.isActive}
									key={item.title}
								/>
							))}
						</SidebarMenu>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter className="bg-background-muted">
					<SidebarMenu>
						<SidebarMenuItem>
							<div
								className={cn(
									'h-9 overflow-hidden transition-all [&>div]:w-full',
									sidebar.open ? '' : '-mx-1',
								)}
							>
								<UserButton
									appearance={{
										elements: {
											rootBox: 'flex overflow-hidden w-full',
											userButtonBox: 'flex-row-reverse text-foreground',
											userButtonOuterIdentifier: 'truncate pl-0',
										},
									}}
									showName
								/>
							</div>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
			</Sidebar>
			<SidebarInset>{children}</SidebarInset>
		</>
	)
}
