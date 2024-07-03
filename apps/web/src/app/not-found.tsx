import { ErrorPage } from './components/errors'

export default function Custom404() {
	return (
		<ErrorPage
			title="404 - Page doesn't exist"
			subtitle="Sorry, we couldn't find the page you were looking for."
		/>
	)
}
