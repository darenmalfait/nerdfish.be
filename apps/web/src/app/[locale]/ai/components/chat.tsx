'use client'

import { type Message, type ToolInvocation } from '@repo/ai'
import { useChat } from '@repo/ai/react'
import {
	Button,
	Input,
	LoadingAnimation,
	Separator,
} from '@repo/design-system/components/ui'
import { SendHorizonalIcon } from '@repo/design-system/icons'
import { useTranslations } from '@repo/i18n/client'
import { useScrollToBottom } from '@repo/lib/hooks/use-scroll-to-bottom'
import { type VariantProps, cva, cx } from '@repo/lib/utils/base'
import { type ComponentPropsWithoutRef, forwardRef, useMemo } from 'react'

const chatMessageVariants = cva(
	'relative animate-rubber rounded-container px-5 py-2.5',
	{
		variants: {
			userRole: {
				user: 'ml-auto w-full max-w-fit rounded-br-none bg-background-info text-right text-foreground-info-contrast',
				assistant:
					'mr-auto w-full max-w-fit rounded-tl-none bg-background-muted',
				system: 'mr-auto w-full max-w-fit rounded-tl-none bg-background-muted',
				error:
					'mr-auto w-full max-w-fit rounded-tl-none bg-background-danger text-foreground-danger-contrast',
			},
		},
		defaultVariants: {
			userRole: 'assistant',
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

const ChatMessage = forwardRef<
	HTMLParagraphElement,
	ComponentPropsWithoutRef<'p'> &
		VariantProps<typeof chatMessageVariants> & {
			toolInvocations?: ToolInvocation[]
		}
>(({ className, userRole, toolInvocations, ...props }, ref) => {
	return (
		<div ref={ref} className={chatMessageVariants({ userRole, className })}>
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
	const t = useTranslations('contact.chat')
	const [messagesContainerRef, messagesEndRef] =
		useScrollToBottom<HTMLDivElement>()

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

	const premadeQuestions = useMemo(
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
		[t],
	)

	return (
		<div className={cx('flex h-full flex-col', className)}>
			<div
				ref={messagesContainerRef}
				className="gap-lg pb-sm flex flex-1 flex-col overflow-y-auto"
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
								userRole={message.role}
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
				})}

				{error?.name ? (
					<ChatMessage userRole="error">
						{error.name}: Something went wrong
					</ChatMessage>
				) : null}

				{isLoading && messages.at(-1)?.role === 'user' ? (
					<ChatMessage userRole="system" className="!animate-none">
						<MessageLoading />
					</ChatMessage>
				) : null}

				<div
					ref={messagesEndRef}
					className="min-h-[12px] min-w-[12px] shrink-0"
				/>
			</div>
			<ul
				className="questions mt-md mb-sm gap-sm px-xs py-sm flex overflow-x-auto overflow-y-visible"
				aria-label={t('premadeQuestions.title')}
			>
				{premadeQuestions.map((q) => (
					<li key={q.buttonName}>
						<Button
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
							icon
							type="submit"
							variant="brand"
							aria-label={t('send')}
						>
							{isLoading ? <LoadingAnimation /> : <SendHorizonalIcon />}
						</Button>
					}
				/>
			</form>
			<Separator className="my-md" />
			<p className="text-foreground-muted text-sm">{t('disclaimer')}</p>
		</div>
	)
}
