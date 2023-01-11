import {ClipboardDocumentListIcon} from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Highlight, {
  defaultProps,
  Language,
  PrismTheme,
} from 'prism-react-renderer'
import nightOwl from 'prism-react-renderer/themes/nightOwl'
import * as React from 'react'

function pad(num: number | string, size = 2) {
  num = num.toString()
  while (num.length < size) num = `0${num}`

  return num
}

type CodeBlockLanguage = Language

function CopyButton({code}: {code: string}) {
  const [copyCount, setCopyCount] = React.useState(0)
  const copied = copyCount > 0

  React.useEffect(() => {
    if (copyCount > 0) {
      const timeout = setTimeout(() => setCopyCount(0), 1000)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [copyCount])

  return (
    <button
      type="button"
      className={clsx(
        'group/button absolute top-3.5 right-4 z-10 overflow-hidden rounded-full py-1 pl-2 pr-3 text-xs font-medium opacity-0 backdrop-blur transition text-primary focus:opacity-100 group-hover:opacity-100',
        copied
          ? 'bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/20'
          : 'hover:bg-white/7.5 dark:bg-white/2.5 bg-white/5 dark:hover:bg-white/5',
      )}
      onClick={async () => {
        await window.navigator.clipboard.writeText(code).then(() => {
          setCopyCount(count => count + 1)
        })
      }}
    >
      <span
        aria-hidden={copied}
        className={clsx(
          'pointer-events-none flex items-center gap-0.5 text-gray-200 transition duration-300',
          copied && '-translate-y-1.5 opacity-0',
        )}
      >
        <ClipboardDocumentListIcon className="fill-gray-500/20 h-5 w-5 stroke-gray-500 transition-colors group-hover/button:stroke-gray-400" />
        Copy
      </span>
      <span
        aria-hidden={!copied}
        className={clsx(
          'pointer-events-none absolute inset-0 flex items-center justify-center text-emerald-400 transition duration-300',
          !copied && 'translate-y-1.5 opacity-0',
        )}
      >
        Copied!
      </span>
    </button>
  )
}

function CodeBlock({
  code = ``,
  language = 'typescript',
  showLineNumbers,
  showLanguage,
  theme,
  className: classNameProp,
}: {
  code?: string
  language?: Language
  showLineNumbers?: boolean
  showLanguage?: boolean
  theme?: PrismTheme
  className?: string
}) {
  return (
    <div className="group relative">
      <Highlight
        {...defaultProps}
        code={code}
        language={language}
        theme={theme ?? nightOwl}
      >
        {({className, style, tokens, getLineProps, getTokenProps}) => (
          <>
            <CopyButton code={code} />
            <pre
              className={clsx(
                classNameProp,
                className,
                'relative my-5 mx-auto overflow-x-auto rounded-xl  !bg-black/90 py-5 pr-8 text-sm leading-relaxed dark:!bg-white/5',
                {
                  'pl-4': !showLineNumbers,
                  'pl-16': showLineNumbers,
                },
              )}
              style={style}
            >
              {tokens.map((line, i) => {
                if (i === tokens.length - 1 && line.length === 0) return null

                return (
                  // eslint-disable-next-line react/jsx-key
                  <div {...getLineProps({line, key: i})}>
                    {showLineNumbers ? (
                      <span className="absolute left-0 mr-[16px] grid w-[40px] shrink-0 place-items-center text-primary-300">
                        {pad(i + 1)}
                      </span>
                    ) : null}
                    {line.length === 0 ? <span>&#8203;</span> : null}
                    {line.map((token, key) => (
                      // eslint-disable-next-line react/jsx-key
                      <span {...getTokenProps({token, key})} />
                    ))}
                  </div>
                )
              })}
              {showLanguage ? (
                <span className="sticky right-0 block w-full text-right text-xs">
                  {language}
                </span>
              ) : null}
            </pre>
          </>
        )}
      </Highlight>
    </div>
  )
}

export {CodeBlock}
export type {CodeBlockLanguage}
