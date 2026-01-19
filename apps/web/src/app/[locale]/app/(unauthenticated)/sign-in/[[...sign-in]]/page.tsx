import { Button } from '@nerdfish/react/button'
import { Particles } from '@repo/design-system/components/particles'
import { Logo } from '@repo/design-system/icons'
import { type WithLocale } from '@repo/i18n/types'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ThemeToggle } from '~/app/theme/components/theme-toggle'

const title = 'Welcome back'
const description = 'Enter your details to sign in.'

const SignIn = dynamic(() =>
	import('@repo/auth/components/sign-in').then((mod) => mod.SignIn),
)

type PageProps = {
	params: Promise<WithLocale>
}

export async function generateMetadata(
	props: PageProps,
): Promise<Metadata | undefined> {
	const { locale } = await props.params

	return createMetadata({
		title,
		description,
		locale,
	})
}

export default function SignInPage() {
	return (
		<div className="bg-background-muted">
			<div className="relative container min-h-screen">
				<div className="top-friends px-friends gap-casual absolute inset-x-0 flex w-full justify-between">
					<Button
						render={
							<div>
								<Link href="/" aria-label="Home">
									<Logo className="h-6 w-auto fill-white" />
								</Link>
								<div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/header-logo:opacity-100">
									<Particles />
								</div>
							</div>
						}
						variant="link"
						className="-mx-best-friends text-foreground group/header-logo relative"
					/>
					<ThemeToggle border={false} />
				</div>
				<div className="flex min-h-screen items-center justify-center">
					<SignIn />
				</div>
			</div>
		</div>
	)
}
