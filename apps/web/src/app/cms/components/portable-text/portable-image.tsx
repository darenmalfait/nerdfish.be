import { cx } from '@nerdfish/utils'
import Image from 'next/image'

function PortableImage({
	alt = '',
	src = '',
	url = src,
	compact = true,
	caption = '',
}: {
	alt?: string
	src?: string
	url?: string
	compact?: boolean
	caption?: string
}) {
	return (
		<div
			className={cx({
				'rounded-container mx-auto max-w-xl overflow-hidden': compact,
			})}
		>
			<Image
				src={url}
				width={compact ? 400 : 800}
				className="w-full"
				height={800}
				alt={alt}
			/>
			{caption ? (
				<p className="text-muted text-center text-sm">{caption}</p>
			) : null}
		</div>
	)
}

export { PortableImage }
