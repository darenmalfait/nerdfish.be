'use client'

import { InViewBackground } from '@repo/design-system/components/in-view-background'
import {
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
	Section,
} from '@repo/design-system/components/section'
import { useTranslations } from '@repo/i18n/client'
import * as React from 'react'
import { Chat } from '../contact/components/chat'
import { HeroBlock } from '~/app/cms/blocks/hero'

export function AIPageContent() {
	const t = useTranslations('')
	return (
		<>
			<HeroBlock variant="secondary" title={t('ai.page.title')}>
				{t('ai.page.description')}
			</HeroBlock>
			<InViewBackground>
				<Section>
					<SectionHeader>
						<SectionHeaderTitle>AI</SectionHeaderTitle>
						<SectionHeaderSubtitle>
							{t('contact.chat.disclaimer')}
						</SectionHeaderSubtitle>
					</SectionHeader>

					<div className="relative">
						<Chat className="rounded-container bg-primary p-lg shadow-outline h-[75vh]" />
					</div>
				</Section>
			</InViewBackground>
		</>
	)
}
