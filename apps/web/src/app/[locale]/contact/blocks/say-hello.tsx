'use client'

import {
	Actor,
	ScrollStage,
	Section,
	useActor,
	useStage,
} from '@nerdfish-website/ui/components'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import tweenFunctions, { linear } from 'tween-functions'
import { type PageBlocksSayHello, PortableText } from '~/app/cms'

const { easeInExpo } = tweenFunctions

const WAVE_END = 0.8

export function SayHelloBlock(props: PageBlocksSayHello) {
	const { text } = props

	return (
		<Section>
			<ScrollStage pages={1.5}>
				<Actor start={0} end={WAVE_END}>
					<Message>
						<PortableText
							data-tina-field={tinaField(props, 'text')}
							content={text}
						/>
					</Message>
				</Actor>
				<MessageOutro>
					<PortableText
						data-tina-field={tinaField(props, 'text')}
						content={text}
					/>
				</MessageOutro>
			</ScrollStage>
		</Section>
	)
}

function Message({ children }: { children: React.ReactNode }) {
	const actor = useActor()
	const opacity = easeInExpo(actor.progress, 0, 1, 1)
	const scale = linear(actor.progress, 10, 1, 1)

	return (
		<div
			style={{
				opacity,
				transform: `scale(${scale})`,
			}}
			className={
				`text-primary flex h-screen w-full flex-col items-center justify-center text-center text-5xl font-black sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl` +
				` ${
					actor.progress > 0 && actor.progress < 1 ? 'fixed inset-0' : 'hidden'
				}`
			}
		>
			{children}
		</div>
	)
}

function MessageOutro({ children }: { children: React.ReactNode }) {
	const stage = useStage()
	return (
		<div
			aria-hidden
			className={
				`sm:leading-6xl text-primary sticky top-0 flex h-screen w-full flex-col items-center justify-center text-center text-4xl font-black sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl` +
				` ${stage.progress < WAVE_END ? 'hidden' : ''}`
			}
		>
			{children}
		</div>
	)
}
