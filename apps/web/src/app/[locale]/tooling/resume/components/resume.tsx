'use client'

import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { H3, Paragraph } from '@repo/design-system/components/ui'
import { Logo } from '@repo/design-system/icons'
import { cx } from '@repo/lib/utils/base'
import { type ReactNode, type ComponentProps } from 'react'
import { useResume } from '../resume-provider'
import { type Resume as ResumeProps } from '../types'
import { Link } from '~/app/components/link'

function ResumePageHeaderInformationItem({
	className,
	...props
}: ComponentProps<'li'>) {
	return (
		<li
			className={cx(
				'flex items-center',
				'[&:not(:last-child)]:after:bg-foreground-muted [&:not(:last-child)]:after:mx-2 [&:not(:last-child)]:after:inline-flex [&:not(:last-child)]:after:h-1 [&:not(:last-child)]:after:w-1 [&:not(:last-child)]:after:items-center [&:not(:last-child)]:after:justify-center [&:not(:last-child)]:after:rounded-none [&:not(:last-child)]:after:content-[""]',
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
		<div className="gap-sm print:gap-xs flex max-w-lg flex-col text-sm">
			<h4 className="text-base print:text-sm">
				<span className="font-bold">{when}</span> <span>|</span>{' '}
				<span>{role ? `${role} at ${where}` : where}</span>
			</h4>
			<Paragraph className="text-foreground-muted !m-0 text-sm">
				{what}
			</Paragraph>
		</div>
	)
}

function SkillsBlock({ type, skills }: { type: string; skills: string }) {
	return (
		<li className="pr-lg list-none print:text-sm">
			<span className="mr-sm font-bold">{type}:</span>
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
		<li className="gap-sm flex flex-col">
			<h4 className="text-base font-bold print:text-sm">{title}</h4>
			<Paragraph className="text-foreground-muted !m-0 text-sm">
				{description}
			</Paragraph>
			<Paragraph className="text-foreground !m-0 line-clamp-3 max-w-7xl text-sm font-bold">
				{technologies}
			</Paragraph>
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
		<Section className="print:pt-lg print:px-lg max-w-5xl break-before-page print:font-mono">
			<SectionHeader
				skipAnimation
				className={cx('print:mb-lg', !showHeader && 'hidden print:!block')}
			>
				{name ? (
					<SectionHeaderTitle className="print:mb-sm">
						{name}
					</SectionHeaderTitle>
				) : null}
				{role ? <SectionHeaderSubtitle>{role}</SectionHeaderSubtitle> : null}
				<ul className="text-foreground-muted flex flex-row">
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
					<div className="p-md rounded-base border-foreground-muted bg-background-muted -mx-md border">
						<H3 className="print:mb-sm print:text-xl">{resume.about.title}</H3>
						<Paragraph className="text-foreground-muted print:text-sm">
							{resume.about.description}
						</Paragraph>
					</div>
				) : null}
				<div className="gap-md mt-xl print:mt-lg md:gap-lg flex flex-col md:flex-row print:flex-row">
					{resume.experience ? (
						<div className="w-full min-w-[55%] flex-1 flex-grow">
							<H3 className="mb-md">{resume.experience.title}</H3>
							<div className="gap-lg print:gap-md flex flex-col">
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
					<div className="gap-lg flex w-full min-w-[45%] flex-col">
						{resume.skills ? (
							<div>
								<H3 className="mb-md">{resume.skills.title}</H3>
								<div className="gap-sm flex flex-col">
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
								<H3 className="mb-md">{resume.education.title}</H3>
								<div className="gap-sm pr-lg flex flex-col">
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
				<div className="print:bottom-md print:right-md hidden print:fixed print:block">
					<Logo className="h-10 w-auto opacity-30" />
				</div>
			</ResumePageLayout>
			{resume.projects ? (
				<ResumePageLayout {...resume}>
					<div>
						<H3 className="mb-md">{resume.projects.title}</H3>
						<ul className="gap-lg flex flex-col">
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
