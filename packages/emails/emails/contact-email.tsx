/* eslint-disable react/no-unescaped-entities */
import {
	Body,
	Head,
	Heading,
	Html,
	Preview,
	Tailwind,
	Text,
} from '@react-email/components'
import * as React from 'react'

export function ContactEmail({
	message = 'message',
	from,
}: {
	message: string
	from: string
}) {
	const body = (
		<Body className="mx-auto my-auto bg-white font-sans">
			<div className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
				<Heading className="mx-0 my-[30px] p-0 text-[24px] font-bold text-black">
					You've got a new message from {from}
				</Heading>
				<Text className="text-[14px] leading-[24px] text-black">{message}</Text>
			</div>
		</Body>
	) as React.ReactNode

	return (
		<Html>
			<Head />
			<Preview>Message from nerdfish contact form!</Preview>
			<Tailwind>{body}</Tailwind>
		</Html>
	)
}

export default ContactEmail
