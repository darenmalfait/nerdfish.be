import { type WithLocale } from '@repo/i18n/types'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { SignInPageContent } from './content'

const title = 'Welcome back'
const description = 'Enter your details to sign in.'

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
	return <SignInPageContent />
}
