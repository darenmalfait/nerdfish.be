import { type Metadata } from 'next'
import { AppHeader } from '~/features/app-shell/components/app-header'
import { Resume } from '~/features/resume/components/resume'
import { ResumeToolbar } from '~/features/resume/components/resume-toolbar'
import { ResumeProvider } from '~/features/resume/resume-provider'

export const metadata: Metadata = {
	title: 'Resume Generator',
	robots: {
		index: false,
		follow: false,
	},
}

export default function ResumePage() {
	return (
		<>
			<AppHeader pages={['App']} page="Resume" />
			<ResumeProvider>
				<Resume />
				<ResumeToolbar />
			</ResumeProvider>
		</>
	)
}
