'use client'

import {
	createContext,
	useContext,
	type ReactNode,
	useMemo,
	useState,
} from 'react'
import { type Resume } from './types'

interface ResumeContextProps {
	resume: Partial<Resume>
	setResume: (resume: Partial<Resume>) => void
}

const ResumeContext = createContext<ResumeContextProps | null>(null)
ResumeContext.displayName = 'ResumeContext'

interface ResumeProviderProps {
	children: ReactNode
}

const initialResume: Partial<Resume> = {
	role: 'Software Engineer',
	name: 'John Doe',
	email: 'john.doe@example.com',
	website: 'https://www.nerdfish.be',
	address: 'Nice Town',
	about: {
		title: 'About Me',
		description:
			'I am a software engineer with a passion for building web applications.',
	},
	experience: {
		title: 'Experience',
		items: [
			{
				role: 'Software Engineer',
				when: '2015-2019',
				where: 'University of Nice',
				what: 'Bachelor of Science in Computer Science',
			},
		],
	},
	skills: {
		title: 'Skills',
		items: [
			{
				type: 'Language',
				skills: 'English, French',
			},
		],
	},
	education: {
		title: 'Education',
		items: [
			{
				when: '2015-2019',
				where: 'University of Nice',
				what: 'Bachelor of Science in Computer Science',
			},
		],
	},
	projects: {
		title: 'Projects',
		items: [
			{
				title: 'Project 1',
				description: 'Description of Project 1',
				technologies: 'Technologies used in Project 1',
			},
		],
	},
}

// import { ResumeProvider } from "path-to-context/ResumeContext"
// use <ResumeProvider> as a wrapper around the part you need the context for
function ResumeProvider({ children }: ResumeProviderProps) {
	const [resume, setResume] = useState<Partial<Resume>>(initialResume)

	return (
		<ResumeContext.Provider
			value={useMemo(
				() => ({
					resume,
					setResume,
				}),
				[resume],
			)}
		>
			{children}
		</ResumeContext.Provider>
	)
}

// import { useResume } fron "path-to-context/ResumeContext"
// within functional component
// const { sessionToken, ...ResumeContext } = useResume()
function useResume(): ResumeContextProps {
	const context = useContext(ResumeContext)

	if (!context) {
		throw new Error('You should use useResume within an ResumeContext')
	}

	return context
}

export { ResumeProvider, useResume }
