import { cn } from '@repo/lib/utils/class'
import Image from 'next/image'

import { type ImageCredit as ImageCreditType } from '~/features/shared/types'

import { ImageCredit } from '../image-credit'

function PortableImageCaption({
	credit,
	caption,
}: {
	credit?: ImageCreditType
	caption?: string
}) {
	if (credit) return <ImageCredit credit={credit} />
	if (!caption) return null

	return <p className="text-foreground-muted text-center text-sm">{caption}</p>
}

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
			<PortableImageCaption credit={credit} caption={caption || title} />
		</div>
	)
}

export { PortableImage }
