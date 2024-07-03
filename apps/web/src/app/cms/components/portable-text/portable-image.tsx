import { cx } from '@nerdfish/utils'
import Image from 'next/image'

function PortableImage({
	alt = '',
	src = '',
	url = src,
	compact = false,
}: {
	alt?: string
	src?: string
	url?: string
	compact?: boolean
}) {
	return (
		<Image
			className={cx({
				'max-w-xs': compact,
			})}
			src={url}
			width={compact ? 400 : 800}
			height={800}
			alt={alt}
		/>
	)
}

export { PortableImage }
