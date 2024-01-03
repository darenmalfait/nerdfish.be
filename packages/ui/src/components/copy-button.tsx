'use client'

import * as React from 'react'
import {copyToClipboardWithMeta} from '@nerdfish-website/lib/utils'
import {cx} from '@nerdfish/utils'
import {Check, Copy} from 'lucide-react'

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string
  src?: string
}

export function CopyButton({value, className, src, ...props}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <button
      className={cx(
        'relative z-20 inline-flex h-6 w-6 items-center justify-center rounded-md border bg-background text-sm font-medium transition-all hover:bg-muted focus:outline-none',
        className,
      )}
      onClick={async () => {
        await copyToClipboardWithMeta(value)
        setHasCopied(true)
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <Check className="h-3 w-3 text-white" />
      ) : (
        <Copy className="h-3 w-3 text-white" />
      )}
    </button>
  )
}
