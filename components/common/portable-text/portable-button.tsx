import Link from 'next/link'
import {Button, getButtonClassName} from '@nerdfish/ui'
import {type ExtractProps} from '@nerdfish/utils'

import {stripPreSlash} from '~/lib/utils/string'

function PortableButton({
  text,
  href,
  variant = 'default',
  ...props
}: {text: string; href?: string} & Pick<
  ExtractProps<typeof Button>,
  'variant'
>) {
  const isExternal = href?.startsWith('http')
  const slug = isExternal ? href : `/${stripPreSlash(href ?? '')}`

  if (!slug) return null

  return (
    <div className="inline-block w-auto">
      <Link
        {...props}
        href={slug}
        className={getButtonClassName({
          accentuate: true,
          size: 'xl',
          className: 'cursor-pointer no-underline',
          variant,
        })}
        target={isExternal ? '_blank' : undefined}
      >
        {text}
      </Link>
    </div>
  )
}

export {PortableButton}
