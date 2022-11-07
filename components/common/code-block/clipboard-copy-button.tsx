import {
  CheckCircleIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/solid'
import clsx from 'clsx'
import * as React from 'react'

async function copyToClipboard(value: string) {
  try {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(value)
      return true
    }

    const element = document.createElement('textarea')
    element.value = value
    document.body.append(element)
    element.select()
    document.execCommand('copy')
    element.remove()

    return true
  } catch {
    return false
  }
}

interface ClipboardCopyButtonProps {
  value: string
  className?: string
}

enum State {
  Idle = 'idle',
  Copy = 'copy',
  Copied = 'copied',
}

function ClipboardCopyButton({ value, className }: ClipboardCopyButtonProps) {
  const [state, setState] = React.useState<State>(State.Idle)

  React.useEffect(() => {
    async function transition() {
      switch (state) {
        case State.Copy: {
          const res = await copyToClipboard(value)
          console.info('copied', res)
          setState(State.Copied)
          break
        }
        case State.Copied: {
          setTimeout(() => {
            setState(State.Idle)
          }, 2000)
          break
        }
        default:
          break
      }
    }
    void transition()
  }, [state, value])

  return (
    <button
      onClick={() => setState(State.Copy)}
      className={clsx(
        'group-group-hover:opacity-100 peer-group-hover:opacity-100 p-2 text-lg font-medium whitespace-nowrap bg-transparent rounded-lg focus:outline-none group-hover:ring-2 focus:ring-2 shadow group-hover:shadow-md group-hover:opacity-100 focus:opacity-100 peer-focus:opacity-100 transition lg:opacity-0',
        className,
        state === State.Copied
          ? 'text-green-400 ring-green-400'
          : 'text-white ring-slate-500 hover:ring-slate-100',
      )}
    >
      <span className="inline">
        {state === State.Copied ? (
          <CheckCircleIcon className="w-5 h-5" />
        ) : (
          <DocumentDuplicateIcon className="w-5 h-5" />
        )}
      </span>
    </button>
  )
}

export { ClipboardCopyButton }
