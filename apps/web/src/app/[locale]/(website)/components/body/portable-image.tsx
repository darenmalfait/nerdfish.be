import { cn } from '@repo/lib/utils/class'
import Image from 'next/image'
import { ImageCredit } from '../image-credit'
import { type ImageCredit as ImageCreditType } from '~/app/types'

function PortableImage({
	alt = '',
	src = '',
	url = src,
	compact = true,
	caption = '',
	title = '',
	credit,
}: {
	alt?: string
	src?: string
	url?: string
	compact?: boolean
	caption?: string
	title?: string
	credit?: ImageCreditType
}) {
	const resolvedCaption = caption || title

	return (
		<div
			className={cn({
				'mx-auto max-w-xl overflow-hidden': compact,
			})}
		>
			<Image
				src={url}
				width={compact ? 400 : 800}
				className="rounded-container w-full"
				height={800}
				alt={alt}
			/>
			{credit ? <ImageCredit credit={credit} /> : null}
			{!credit && resolvedCaption ? (
				<p className="text-foreground-muted text-center text-sm">
					{resolvedCaption}
				</p>
			) : null}
		</div>
	)
}

export { PortableImage }
