'use client'

import { Button, useMediaQuery } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { useLockBody } from '@repo/lib/hooks/use-body-lock'
import { BotIcon, XIcon } from '@repo/ui/icons'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { Chat } from '../components/chat'
import { type Block, type PageBlocksChatbot } from '~/app/cms/types'

function LockBody() {
	useLockBody()
	return null
}

export function ChatbotBlock(props: Block<PageBlocksChatbot>) {
	const [isOpen, setIsOpen] = React.useState<boolean>(false)
	const isMobile = useMediaQuery('(max-width: 768px)')
	const { icon } = props
	const t = useTranslations('contact.chat')

	const Icon = icon ?? BotIcon

	return (
		<div className="right-xs gap-sm fixed inset-y-0 z-50 flex items-center">
			<h2 className="sr-only">{t('title')}</h2>
			<div aria-hidden>
				<Button
					aria-hidden
					type="button"
					size="icon"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? <XIcon className="size-4" /> : <Icon className="size-4" />}
				</Button>
			</div>
			<div
				className={cx(
					'gap-md rounded-base bg-secondary duration-250 flex flex-col overflow-hidden transition-all ease-out md:h-[600px]',
					{
						'w-0 opacity-0': !isOpen,
						'p-md opacity-1 shadow-outline fixed inset-0 z-50 md:relative md:inset-auto md:w-[400px]':
							isOpen,
					},
				)}
			>
				<Chat />
				{isOpen ? (
					<Button
						aria-hidden
						type="button"
						size="icon"
						variant="ghost"
						className="top-md right-md absolute md:hidden"
						onClick={() => setIsOpen(!isOpen)}
						aria-label={t('close')}
					>
						<XIcon className="size-4" />
					</Button>
				) : null}
				{isMobile && isOpen ? <LockBody /> : null}
			</div>
		</div>
	)
}
