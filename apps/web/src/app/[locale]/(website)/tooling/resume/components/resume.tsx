'use client'

import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { Logo } from '@repo/design-system/icons'
import { cn } from '@repo/lib/utils/class'
import { type ReactNode, type ComponentProps } from 'react'
import { Link } from '../../../components/link'
import { useResume } from '../resume-provider'
import { type Resume as ResumeProps } from '../types'

function ResumePageHeaderInformationItem({
	className,
	...props
}: ComponentProps<'li'>) {
	return (
		<li
			className={cn(
				'flex items-center',
				'not-last:after:bg-foreground-muted not-last:after:mx-2 not-last:after:inline-flex not-last:after:h-1 not-last:after:w-1 not-last:after:items-center not-last:after:justify-center not-last:after:rounded-none not-last:after:content-[""]',
				className,
			)}
			{...props}
		/>
	)
}

function ExperienceBlock({
	when,
	where,
	what,
	role,
}: {
	when: string
	where: string
	what: string
	role?: string
}) {
	return (
		<div className="gap-best-friends print:gap-bff flex max-w-lg flex-col text-sm">
			<h4 className="text-base print:text-sm">
				<span className="font-bold">{when}</span> <span>|</span>{' '}
				<span>{role ? `${role} at ${where}` : where}</span>
			</h4>
			<p className="typography-body text-foreground-muted m-0! text-sm">
				{what}
			</p>
		</div>
	)
}

function SkillsBlock({ type, skills }: { type: string; skills: string }) {
	return (
		<li className="pr-casual list-none print:text-sm">
			<span className="mr-best-friends font-bold">{type}:</span>
			<span className="text-foreground-muted">{skills}</span>
		</li>
	)
}

function ProjectsBlock({
	title,
	description,
	technologies,
}: {
	title: string
	description: string
	technologies: string
}) {
	return (
		<li className="gap-best-friends flex flex-col">
			<h4 className="text-base font-bold print:text-sm">{title}</h4>
			<p className="typography-body text-foreground-muted m-0! text-sm">
				{description}
			</p>
			<p className="typography-body text-foreground m-0! line-clamp-3 max-w-7xl text-sm font-bold">
				{technologies}
			</p>
		</li>
	)
}

interface ResumePageLayoutProps extends Partial<ResumeProps> {
	children: ReactNode
	showHeader?: boolean
}

function ResumePageLayout({
	children,
	name,
	role,
	email,
	website,
	address,
	showHeader = false,
}: ResumePageLayoutProps) {
	return (
		<Section className="print:pt-casual print:px-casual max-w-5xl break-before-page print:font-mono">
			<SectionHeader
				skipAnimation
				className={cn('print:mb-casual', !showHeader && 'hidden print:block!')}
			>
				{name ? (
					<SectionHeaderTitle className="print:mb-best-friends">
						{name}
					</SectionHeaderTitle>
				) : null}
				{role ? <SectionHeaderSubtitle>{role}</SectionHeaderSubtitle> : null}
				<ul className="text-foreground-muted mt-best-friends flex flex-row">
					{email ? (
						<ResumePageHeaderInformationItem>
							<Link href={`mailto:${email}`}>{email}</Link>
						</ResumePageHeaderInformationItem>
					) : null}
					{address ? (
						<ResumePageHeaderInformationItem>
							{address}
						</ResumePageHeaderInformationItem>
					) : null}
					{website ? (
						<ResumePageHeaderInformationItem>
							<Link href={website} target="_blank" rel="noopener noreferrer">
								{website.startsWith('http') ? website : `https://${website}`}
							</Link>
						</ResumePageHeaderInformationItem>
					) : null}
				</ul>
			</SectionHeader>
			{children}
		</Section>
	)
}

export function Resume() {
	const { resume } = useResume()

	return (
		<>
			<ResumePageLayout {...resume} showHeader={true}>
				{resume.about?.title ? (
					<div className="p-friends rounded-container border-foreground-muted bg-background-muted -mx-friends border">
						<h3 className="typography-title mb-best-friends print:text-xl">
							{resume.about.title}
						</h3>
						<p className="typography-body text-foreground-muted print:text-sm">
							{resume.about.description}
						</p>
					</div>
				) : null}
				<div className="gap-friends mt-acquaintances print:mt-casual md:gap-casual flex flex-col md:flex-row print:flex-row">
					{resume.experience ? (
						<div className="w-full min-w-[55%] flex-1 grow">
							<h3 className="typography-title mb-friends">
								{resume.experience.title}
							</h3>
							<div className="gap-casual print:gap-friends flex flex-col">
								{resume.experience.items.map((item, index) => (
									<ExperienceBlock
										key={index}
										when={item.when}
										where={item.where}
										what={item.what}
										role={item.role}
									/>
								))}
							</div>
						</div>
					) : null}
					<div className="gap-acquaintances flex w-full min-w-[45%] flex-col">
						{resume.skills ? (
							<div>
								<h3 className="typography-title mb-friends">
									{resume.skills.title}
								</h3>
								<div className="gap-best-friends flex flex-col">
									{resume.skills.items.map((item, index) => (
										<SkillsBlock
											key={index}
											type={item.type}
											skills={item.skills}
										/>
									))}
								</div>
							</div>
						) : null}
						{resume.education ? (
							<div>
								<h3 className="typography-title mb-friends">
									{resume.education.title}
								</h3>
								<div className="gap-best-friends pr-casual flex flex-col">
									{resume.education.items.map((item, index) => (
										<ExperienceBlock
											key={index}
											when={item.when}
											where={item.where}
											what={item.what}
										/>
									))}
								</div>
							</div>
						) : null}
					</div>
				</div>
				<div className="print:bottom-friends print:right-friends hidden print:fixed print:block">
					<Logo className="h-10 w-auto opacity-30" />
				</div>
			</ResumePageLayout>
			{resume.projects ? (
				<ResumePageLayout {...resume}>
					<div>
						<h3 className="typography-title mb-friends">
							{resume.projects.title}
						</h3>
						<ul className="gap-casual flex flex-col">
							{resume.projects.items.map((item, index) => (
								<ProjectsBlock
									key={index}
									title={item.title}
									description={item.description}
									technologies={item.technologies}
								/>
							))}
						</ul>
					</div>
				</ResumePageLayout>
			) : null}
		</>
	)
}
