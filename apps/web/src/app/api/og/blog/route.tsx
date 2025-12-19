/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unknown-property */
import { fetchFont } from '@repo/og-utils/fetch-font'
import { blogParams } from '@repo/og-utils/zod-params'
import { ImageResponse } from '@vercel/og'
import { env } from 'env'

export const runtime = 'edge'

export async function GET(req: Request) {
	const [geist900, geist700, geist400] = await Promise.all([
		fetchFont('Geist', 900),
		fetchFont('Geist', 700),
		fetchFont('Geist', 400),
	])

	const parsed = blogParams.decodeRequest(req)

	if (!parsed.success) {
		return new Response(parsed.error.message.toString(), { status: 400 })
	}

	const props = parsed.data.input
	const imageUrl = props.image
		? props.image.startsWith('http')
			? props.image
			: `${env.NEXT_PUBLIC_URL}${props.image}`
		: `${env.NEXT_PUBLIC_URL}/uploads/og.png`

	const paint = '#f8f8f8'

	return new ImageResponse(
		<div
			tw="flex relative w-full h-full bg-[#272829]"
			style={{
				fontFamily: 'Geist',
				color: paint,
			}}
		>
			<div tw="flex flex-col justify-end pl-16 pr-4 pb-16 max-w-[700px]">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1906 377"
					fill={paint}
					height="48px"
				>
					<path
						d="m1729.01 4.25 31.87 2.25v102.75c10.88-17.625 39.38-30 65.25-30 54.75 0 77.25 55.125 77.25 108.375v86.625c0 8.25 0 17.25 2.25 24.75h-36.37V179.75c0-37.875-21.75-68.625-59.25-68.625-25.13 0-39.75 14.25-49.13 31.875v156h-31.87V4.25ZM1581.72 176.375c56.25 10.5 78 27.375 78 59.625 0 40.125-33.37 68.625-85.12 68.625-38.25 0-67.5-15.375-89.63-45l21.38-21.75c20.62 24.375 43.12 38.25 68.62 38.25 29.25 0 54.75-18.375 54.75-39.75 0-14.25-11.25-21-46.87-28.125-63.38-12.75-88.88-32.25-88.88-65.625 0-37.875 33-63.375 83.63-63.375 35.25 0 63.75 12.375 79.5 34.875l-20.25 20.25c-17.63-18.75-33.38-25.875-56.63-25.875-32.62 0-56.25 13.875-56.25 33.375 0 17.25 18.75 27 57.75 34.5ZM1405.19 299h-162.75v-26.25h66.75V111.5l-43.88-2.625V85.25h74.63v187.5h63v1.5c0 8.25 0 17.25 2.25 24.75Zm-84.38-251.625c-15.37 0-23.62-8.25-23.62-23.625 0-15 8.62-23.25 23.62-23.25 15 0 23.25 8.25 23.25 23.25 0 15.375-8.25 23.625-23.25 23.625ZM1037.02 207.5h-40.872v-28.875h40.872V79.25c.38-49.875 36.75-78.75 75-78.75 27 0 55.88 14.625 72 49.875l-28.5 12.75C1146.15 41.375 1128.15 32 1111.27 32c-22.12 0-42.37 16.125-42.37 48v98.625h84.75V207.5h-84.75v168.75l-31.88-2.25V207.5ZM730.361 186.125c0-67.5 34.875-106.875 93.375-106.875 29.625 0 49.5 10.125 65.625 32.25V4.25l31.875 2.25v267.75c0 8.25 0 17.25 2.25 24.75h-34.125v-16.125c-15.75 13.5-37.125 21.375-61.125 21.375-58.5 0-97.875-46.875-97.875-118.125Zm31.875.375c0 51 27.75 87.375 66.75 87.375 31.125 0 50.25-10.5 60.375-31.875v-93.375c-13.875-25.875-37.5-41.25-64.125-41.25-38.25 0-63 31.125-63 79.125ZM649.824 299h-162.75v-26.25h66.375V111.5l-43.875-2.625V85.25h78.75c-2.625 4.125-6 20.25-6 25.125 15-28.5 48.75-31.125 65.25-31.125 8.25 0 16.5.75 40.875 10.125L668.574 120.5c-10.875-6-21.75-8.625-32.25-8.625-25.125 0-46.875 15.375-52.125 38.25V272.75h63.375v1.5c0 8.25 0 17.25 2.25 24.75ZM240.412 207.125v-18.75c0-69 34.125-109.125 97.5-109.125 72 0 87 52.125 87 111 0 5.625 0 11.25-.375 16.875h-152.25c.375 39.75 26.625 68.625 64.125 68.625 19.125 0 39.375-7.125 63.375-30.375l19.125 23.25c-21 22.875-50.25 36-81.75 36-55.875 0-96.375-41.25-96.75-97.5Zm93-99.75c-42.375 0-58.875 27.375-60.75 71.25h118.5l.375-7.125c-.375-41.25-19.875-64.125-58.125-64.125ZM1.25 299V85.25H.5h40.875c-3.375 4.875-8.25 16.5-8.25 26.25V299H1.25ZM32 145.25v-34.125C42.125 92.375 71.375 79.25 98 79.25c55.125 0 77.625 55.125 77.625 108.375v86.625c0 8.25 0 17.25 2.25 24.75H141.5V179.75c0-37.875-21.75-68.625-59.25-68.625C56 111.125 41.375 126.5 32 145.25Z"
						fill="currentColor"
					/>
				</svg>
				<div tw="flex items-center mt-[36px]">
					<div tw="text-[42px] font-bold">{props.title}</div>
				</div>
			</div>
			<img
				style={{
					position: 'absolute',
					right: '-250px',
					top: '40px',
					objectFit: 'cover',
				}}
				src={imageUrl}
				tw="rounded-[2.625rem] shadow-2xl"
				height={550}
				width={700}
				alt="seo"
			/>
		</div>,
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'Geist',
					data: geist400,
					weight: 400,
				},
				{
					name: 'Geist',
					data: geist700,
					weight: 700,
				},
				{
					name: 'Geist',
					data: geist900,
					weight: 900,
				},
			],
		},
	)
}
