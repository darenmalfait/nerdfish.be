import { type Metadata } from 'next'
import { Resume } from './components/resume'
import { ResumeToolbar } from './components/resume-toolbar'
import { ResumeProvider } from './resume-provider'

export const metadata: Metadata = {
	title: 'Resume Generator',
	robots: {
		index: false,
		follow: false,
	},
}

export default function ResumePage() {
	return (
		<ResumeProvider>
			<Resume />
			<ResumeToolbar />
		</ResumeProvider>
	)
}
