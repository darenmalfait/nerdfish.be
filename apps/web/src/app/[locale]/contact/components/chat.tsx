'use client'

import { Button, Input, LoadingAnimation } from '@nerdfish/ui'
import { type VariantProps, cva, cx } from '@nerdfish/utils'
import { SendHorizonalIcon } from '@repo/ui/icons'
import type { Message, ToolInvocation } from 'ai'
import { useChat } from 'ai/react'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { EmbeddedCal } from './embedded-cal'

const chatMessageVariants = cva(
	'relative animate-rubber rounded-container px-5 py-2.5',
	{
		variants: {
			userRole: {
				user: 'ml-auto w-8/12 max-w-fit rounded-br-none bg-success text-success',
				assistant:
					'mr-auto w-11/12 max-w-fit rounded-tl-none bg-accent text-white',
				system: 'mr-auto w-full max-w-[400px] rounded-tl-none',
				error:
					'mr-auto w-11/12 max-w-fit rounded-tl-none bg-danger text-danger',
			},
		},
		defaultVariants: {
			userRole: 'assistant',
		},
	}
)

function MessageLoading() {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			className="text-foreground"
		>
			<circle cx="4" cy="12" r="2" fill="currentColor">
				<animate
					id="spinner_qFRN"
					begin="0;spinner_OcgL.end+0.25s"
					attributeName="cy"
					calcMode="spline"
					dur="0.6s"
					values="12;6;12"
					keySplines=".33,.66,.66,1;.33,0,.66,.33"
				/>
			</circle>
			<circle cx="12" cy="12" r="2" fill="currentColor">
				<animate
					begin="spinner_qFRN.begin+0.1s"
					attributeName="cy"
					calcMode="spline"
					dur="0.6s"
					values="12;6;12"
					keySplines=".33,.66,.66,1;.33,0,.66,.33"
				/>
			</circle>
			<circle cx="20" cy="12" r="2" fill="currentColor">
				<animate
					id="spinner_OcgL"
					begin="spinner_qFRN.begin+0.2s"
					attributeName="cy"
					calcMode="spline"
					dur="0.6s"
					values="12;6;12"
					keySplines=".33,.66,.66,1;.33,0,.66,.33"
				/>
			</circle>
		</svg>
	)
}

const ChatMessage = React.forwardRef<
	HTMLParagraphElement,
	React.ComponentPropsWithoutRef<'p'> &
		VariantProps<typeof chatMessageVariants> & {
			toolInvocations?: ToolInvocation[]
		}
>(({ className, userRole, toolInvocations, ...props }, ref) => {
	if (toolInvocations?.length) {
		return (
			<div className="flex flex-col gap-sm">
				{toolInvocations.map((toolInvocation) => {
					const { toolName, toolCallId } = toolInvocation

					return (
						<div key={toolCallId} className="w-full">
							{toolName === 'booking' ? (
								<EmbeddedCal bookingType="30min" />
							) : null}
						</div>
					)
				})}
			</div>
		)
	}
	return (
		<div ref={ref} className={chatMessageVariants({ userRole, className })}>
			<p className="whitespace-pre-line font-medium text-base" {...props} />
		</div>
	)
})

ChatMessage.displayName = 'ChatMessage'

export function Chat({
	initialMessages,
	className,
}: {
	initialMessages?: Message[]
	className?: string
}) {
	const t = useTranslations('contact.chat')
	const scrollBottomAnchor = React.useRef<HTMLDivElement>(null)

	const {
		isLoading,
		setInput,
		messages,
		input,
		handleSubmit,
		handleInputChange,
		error,
	} = useChat({
		initialMessages,
		api: '/api/chat',
		body: {},
	})

	const premadeQuestions = React.useMemo(
		() => [
			{
				buttonName: t('premadeQuestions.whoAreYou'),
				question: t('premadeQuestions.whoAreYouQuestion'),
			},
			{
				buttonName: t('premadeQuestions.favoriteLanguage'),
				question: t('premadeQuestions.favoriteLanguageQuestion'),
			},
			{
				buttonName: t('premadeQuestions.experience'),
				question: t('premadeQuestions.experienceQuestion'),
			},
			{
				buttonName: t('premadeQuestions.currentJob'),
				question: t('premadeQuestions.currentJobQuestion'),
			},
		],
		[t]
	)

	const scrollToBottom = React.useCallback(() => {
		if (!scrollBottomAnchor.current) return

		scrollBottomAnchor.current.scrollTo({
			top: scrollBottomAnchor.current.scrollHeight,
		})
	}, [])

	// biome-ignore lint/correctness/useExhaustiveDependencies: we want it to run on messages change
	React.useEffect(() => {
		scrollToBottom()
	}, [scrollToBottom, messages])

	return (
		<div className={cx('flex h-full flex-col', className)}>
			<div
				ref={scrollBottomAnchor}
				className="flex flex-1 flex-col gap-lg overflow-y-auto pb-xl"
			>
				<ChatMessage userRole="assistant" className="!animate-none">
					{t('initialMessage')}
				</ChatMessage>
				{messages.map((message) => {
					if (message.role === 'user') {
						return (
							<ChatMessage
								key={message.id}
								toolInvocations={message.toolInvocations}
								role={message.role}
							>
								{message.content}
							</ChatMessage>
						)
					}

					return (
						<ChatMessage
							key={message.id}
							userRole="assistant"
							toolInvocations={message.toolInvocations}
							// biome-ignore lint/security/noDangerouslySetInnerHtml: We know what we're doing
							dangerouslySetInnerHTML={{
								__html: message.content
									.replace(/ *【.*】 */g, '')
									.replace(/ *\[.*] */g, '')
									.replace(/\.{2,}/g, '.')
									.replace(' .', '.')
									.replace(
										/(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?/=~_|!:,.;]*)[-A-Z0-9+&@#/%=~_|])/gi,
										'<a href="$&" target="_blank" rel="noopener noreferrer" class="underline">$&</a>'
									),
							}}
						/>
					)
				})}

				{error?.name ? (
					<ChatMessage userRole="error">
						{error.name}: Something went wrong
					</ChatMessage>
				) : null}

				{isLoading && messages.at(-1)?.role === 'user' ? (
					<ChatMessage userRole="assistant" className="!animate-none">
						<MessageLoading />
					</ChatMessage>
				) : null}
			</div>
			<ul
				className="questions mt-md mb-sm flex gap-sm overflow-x-auto overflow-y-visible px-xs py-sm"
				aria-label={t('premadeQuestions.title')}
			>
				{premadeQuestions.map((q) => (
					<li key={q.buttonName}>
						<Button
							size="sm"
							variant="outline"
							className="whitespace-nowrap"
							onClick={() => {
								setInput(q.question)
							}}
							aria-label={t('premadeQuestions.ask', { question: q.buttonName })}
						>
							{q.buttonName}
						</Button>
					</li>
				))}
			</ul>
			<form onSubmit={handleSubmit}>
				<Input
					value={input}
					onChange={(event) =>
						event.target.value.length < 80 && handleInputChange(event)
					}
					inputSize="lg"
					className="!pr-md w-full"
					placeholder={t('inputPlaceholder')}
					addOnTrailing={
						<Button
							disabled={!input || !!error || isLoading}
							size="icon"
							type="submit"
							variant="accent"
							aria-label={t('send')}
						>
							{isLoading ? (
								<LoadingAnimation variant="classic" className="size-4" />
							) : (
								<SendHorizonalIcon className="size-4" />
							)}
						</Button>
					}
				/>
			</form>
		</div>
	)
}
