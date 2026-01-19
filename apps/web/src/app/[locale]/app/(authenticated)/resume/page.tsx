import { type Metadata } from 'next'
import { AppHeader } from '../../components/app-header'
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
		<>
			<AppHeader pages={['App']} page="Resume" />
			<ResumeProvider>
				<Resume />
				<ResumeToolbar />
			</ResumeProvider>
		</>
	)
}
