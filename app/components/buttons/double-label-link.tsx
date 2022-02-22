import { ChevronRightIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import * as React from 'react'

import { Link } from './link'

interface DoubleLabelLinkProps {
  className?: string
  href?: string
  description?: string
  children: React.ReactNode
}

function DoubleLabelLink({
  children,
  className,
  description,
  ...props
}: DoubleLabelLinkProps) {
  return (
    <Link
      {...props}
      className={clsx(
        className,
        'group inline-flex items-center p-1 pr-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors sm:text-base lg:text-sm xl:text-base text-primary bg-secondary',
      )}
    >
      {children && (
        <span className="py-0.5 px-3 text-xs font-semibold tracking-wide leading-5 uppercase rounded-full transition-colors text-inverse bg-inverse">
          {children}
        </span>
      )}

      {description && <span className="ml-4 text-sm">{description}</span>}
      <ChevronRightIcon
        className="ml-2 w-5 h-5 text-gray-500"
        aria-hidden="true"
      />
    </Link>
  )
}

export { DoubleLabelLink }
