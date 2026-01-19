import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@nerdfish/react/breadcrumb'
import { Separator } from '@nerdfish/react/separator'
import { SidebarTrigger } from '@nerdfish/react/sidebar'
import { Fragment, type ReactNode } from 'react'

type AppHeaderProps = {
	pages: string[]
	page: string
	children?: ReactNode
}

export function AppHeader({ pages, page, children }: AppHeaderProps) {
	return (
		<header className="flex h-16 shrink-0 items-center justify-between gap-2 print:hidden">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator className="mr-2 h-4" orientation="vertical" />
				<Breadcrumb>
					<BreadcrumbList>
						{pages.map((p, index) => (
							<Fragment key={p}>
								{index > 0 ? (
									<BreadcrumbSeparator className="hidden md:block" />
								) : null}
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#">{p}</BreadcrumbLink>
								</BreadcrumbItem>
							</Fragment>
						))}
						<BreadcrumbSeparator className="hidden md:block" />
						<BreadcrumbItem>
							<BreadcrumbPage>{page}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			{children}
		</header>
	)
}
