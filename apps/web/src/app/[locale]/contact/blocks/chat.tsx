'use client'

import { Button, useMediaQuery } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { useLockBody } from '@repo/lib/hooks/use-body-lock'
import { BotIcon, XIcon } from '@repo/ui/icons'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import type { Block, PageBlocksChatbot } from '~/app/cms/types'
import { Chat } from '../components/chat'

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
		<div className="fixed inset-y-0 right-xs z-50 flex items-center gap-sm">
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
					'flex flex-col gap-md overflow-hidden rounded-base bg-secondary transition-all duration-250 ease-out md:h-[600px]',
					{
						'w-0 opacity-0': !isOpen,
						'fixed inset-0 z-50 p-md opacity-1 shadow-outline md:relative md:inset-auto md:w-[400px]':
							isOpen,
					}
				)}
			>
				<Chat />
				{isOpen ? (
					<>
						<Button
							aria-hidden
							type="button"
							size="icon"
							variant="ghost"
							className="absolute top-md right-md md:hidden"
							onClick={() => setIsOpen(!isOpen)}
							aria-label={t('close')}
						>
							<XIcon className="size-4" />
						</Button>
					</>
				) : null}
				{isMobile && isOpen ? <LockBody /> : null}
			</div>
		</div>
	)
}
