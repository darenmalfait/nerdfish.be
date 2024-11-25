'use client'

import { Paragraph } from '@nerdfish/ui'
import { BotIcon } from '@nerdfish-website/ui/icons'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { Chat } from '../components'
import {
	ExpandableChat,
	ExpandableChatBody,
	ExpandableChatFooter,
} from '../components/expandable-chat'
import { type Block, type PageBlocksChatbot } from '~/app/cms'
import { useTranslation } from '~/app/i18n'

export function ChatbotBlock(props: Block<PageBlocksChatbot>) {
	const { icon } = props
	const { t } = useTranslation()

	const Icon = icon ?? BotIcon

	return (
		<ExpandableChat
			// TODO: find a way to not overlap the navigation
			className="hidden md:block"
			icon={
				<Icon
					data-tina-field={tinaField(props, 'icon')}
					className="group-hover:motion-preset-seesaw size-6"
				/>
			}
			aria-label={t('ai.page.title')}
		>
			<ExpandableChatBody>
				<Chat />
			</ExpandableChatBody>
			<ExpandableChatFooter>
				<Paragraph className="text-left text-xs">
					{t('ai.description')}
				</Paragraph>
			</ExpandableChatFooter>
		</ExpandableChat>
	)
}
