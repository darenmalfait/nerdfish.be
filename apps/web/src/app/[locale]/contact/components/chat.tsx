'use client'

import { Button, Input, LoadingAnimation } from '@nerdfish/ui'
import { cva, cx, type VariantProps } from '@nerdfish/utils'
import { SendHorizonalIcon } from '@nerdfish-website/ui/icons'
import { type Message, type ToolInvocation } from 'ai'
import { useChat } from 'ai/react'
import * as React from 'react'
import { EmbeddedCal } from '../../contact'
import { useTranslation } from '~/app/i18n'

const chatMessageVariants = cva(
	'rounded-container animate-rubber relative px-5 py-2.5',
	{
		variants: {
			role: {
				user: 'bg-success text-success ml-auto w-8/12 max-w-fit rounded-br-none',
				assistant:
					'bg-accent text-white mr-auto w-11/12 max-w-fit rounded-tl-none',
				system: 'mr-auto w-full max-w-[400px] rounded-tl-none',
				error:
					'bg-danger text-danger mr-auto w-11/12 max-w-fit rounded-tl-none',
			},
		},
		defaultVariants: {
			role: 'assistant',
		},
	},
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
>(({ className, role, toolInvocations, ...props }, ref) => {
	if (toolInvocations?.length) {
		return (
			<div className="gap-sm flex flex-col">
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
		<div ref={ref} className={chatMessageVariants({ role, className })}>
			<p className="whitespace-pre-line text-base font-medium" {...props} />
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
	const { t } = useTranslation()
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
		api: '/api/ai',
		body: {},
	})

	const premadeQuestions = React.useMemo(
		() => [
			{
				buttonName: t('ai.premadeQuestions.whoAreYou'),
				question: t('ai.premadeQuestions.whoAreYouQuestion'),
			},
			{
				buttonName: t('ai.premadeQuestions.favoriteLanguage'),
				question: t('ai.premadeQuestions.favoriteLanguageQuestion'),
			},
			{
				buttonName: t('ai.premadeQuestions.experience'),
				question: t('ai.premadeQuestions.experienceQuestion'),
			},
			{
				buttonName: t('ai.premadeQuestions.currentJob'),
				question: t('ai.premadeQuestions.currentJobQuestion'),
			},
		],
		[t],
	)

	const scrollToBottom = React.useCallback(() => {
		if (!scrollBottomAnchor.current) return

		scrollBottomAnchor.current.scrollTo({
			top: scrollBottomAnchor.current.scrollHeight,
		})
	}, [])

	React.useEffect(() => {
		scrollToBottom()
	}, [scrollToBottom, messages])

	return (
		<div className={cx('flex h-full flex-col', className)}>
			<div
				ref={scrollBottomAnchor}
				className="gap-lg pb-xl flex flex-1 flex-col overflow-y-auto"
			>
				<ChatMessage role="assistant" className="!animate-none">
					{t('ai.chat.initialMessage')}
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
					} else {
						return (
							<ChatMessage
								key={message.id}
								role="assistant"
								toolInvocations={message.toolInvocations}
								dangerouslySetInnerHTML={{
									__html: message.content
										.replace(/ *【.*】 */g, '')
										.replace(/ *\[.*] */g, '')
										.replace(/\.{2,}/g, '.')
										.replace(' .', '.')
										.replace(
											/(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?/=~_|!:,.;]*)[-A-Z0-9+&@#/%=~_|])/gi,
											'<a href="$&" target="_blank" rel="noopener noreferrer" class="underline">$&</a>',
										),
								}}
							/>
						)
					}
				})}

				{error?.name ? (
					<ChatMessage role="error">
						{error.name}: Something went wrong
					</ChatMessage>
				) : null}

				{isLoading && messages[messages.length - 1]?.role === 'user' ? (
					<ChatMessage role="assistant" className="!animate-none">
						<MessageLoading />
					</ChatMessage>
				) : null}
			</div>
			<ul
				className="questions mt-md mb-sm gap-sm py-sm px-xs flex overflow-x-auto overflow-y-visible"
				aria-label="Premade questions"
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
							aria-label={`Ask ${q.buttonName}`}
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
					placeholder="Ask a question"
					addOnTrailing={
						<Button
							disabled={!input || !!error || isLoading}
							size="icon"
							type="submit"
							variant="accent"
							aria-label="Send"
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
