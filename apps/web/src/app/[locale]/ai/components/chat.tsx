'use client'

import { Button, Input, Skeleton } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { SpinnerIcon } from '@nerdfish-website/ui/icons'
import { useChat } from 'ai/react'
import { ArrowUpIcon } from 'lucide-react'
import * as React from 'react'
import { z } from 'zod'
import { useTranslation } from '../../translation-provider'

const ChatMessage = React.forwardRef<
	HTMLParagraphElement,
	React.ComponentPropsWithoutRef<'p'> & {
		role: 'user' | 'assistant' | 'system' | 'error'
	}
>(({ className, role, ...props }, ref) => (
	<div
		ref={ref}
		className={cx(
			'rounded-semi animate-rubber relative px-5 py-2.5',
			{
				'bg-success text-success ml-auto w-8/12 max-w-fit rounded-br-none':
					role === 'user',
				'bg-accent mr-auto w-11/12 max-w-fit rounded-tl-none text-white':
					role === 'assistant',
				'mr-auto w-full max-w-[400px] rounded-tl-none': role === 'system',
				'bg-danger text-danger mr-auto w-11/12 max-w-fit rounded-tl-none':
					role === 'error',
			},
			className,
		)}
	>
		<p className="whitespace-pre-line text-base font-medium" {...props} />
	</div>
))

ChatMessage.displayName = 'ChatMessage'

const messageSchema = z
	.string()
	.min(1)
	.max(80)
	.regex(/.*[^ ].*/)

export function Chat() {
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
		<div className="rounded-semi shadow-outline flex flex-col bg-transparent p-6">
			<div
				ref={scrollBottomAnchor}
				className="gap-lg pb-xl flex h-[40vh] flex-col overflow-y-auto"
			>
				<ChatMessage role="assistant">
					{t('ai.chat.initialMessage')}
				</ChatMessage>
				{messages.map((message) => {
					if (message.role === 'user') {
						return (
							<ChatMessage key={message.id} role="user">
								{message.content}
							</ChatMessage>
						)
					} else {
						return (
							<ChatMessage
								key={message.id}
								role="assistant"
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
					<ChatMessage role="system">
						<Skeleton className="rounded-semi absolute inset-0 h-10 rounded-tl-none" />
					</ChatMessage>
				) : null}
			</div>
			<ul
				className="questions mt-xl mb-sm gap-sm py-sm px-xs flex overflow-x-auto overflow-y-visible"
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
			<form
				onSubmit={async (e) => {
					e.preventDefault()
					if (messageSchema.safeParse(input).success) return handleSubmit()
				}}
			>
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
							variant="success"
							aria-label="Send"
						>
							{isLoading ? <SpinnerIcon /> : <ArrowUpIcon className="size-4" />}
						</Button>
					}
				/>
			</form>
		</div>
	)
}
