'use client'

import * as React from 'react'
import {cx} from '@nerdfish/utils'
import {ClipboardCopy} from 'lucide-react'
import Highlight, {
  Language,
  PrismTheme,
  defaultProps,
} from 'prism-react-renderer'

import {useTheme} from '~/context/theme-provider'

import darkTheme from './vscode-dark'
import lightTheme from './vscode-light'

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
      className={cx(
        'group/button absolute top-3.5 right-4 z-10 overflow-hidden rounded-full py-1 pl-2 pr-3 text-xs font-medium opacity-0 backdrop-blur transition text-primary focus:opacity-100 group-hover:opacity-100',
        copied
          ? 'bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/20'
          : 'bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10',
      )}
      onClick={async () => {
        await window.navigator.clipboard.writeText(code).then(() => {
          setCopyCount(count => count + 1)
        })
      }}
    >
      <span
        aria-hidden={copied}
        className={cx(
          'pointer-events-none flex items-center gap-0.5 text-gray-800 transition duration-300 dark:text-gray-200',
          copied && '-translate-y-1.5 opacity-0',
        )}
      >
        <ClipboardCopy className="h-5 w-5 fill-gray-500/20 stroke-gray-500 transition-colors group-hover/button:stroke-gray-400" />
        Copy
      </span>
      <span
        aria-hidden={!copied}
        className={cx(
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
  forceColorTheme,
}: {
  code?: string
  language?: Language
  showLineNumbers?: boolean
  showLanguage?: boolean
  theme?: PrismTheme
  className?: string
  forceColorTheme?: 'light' | 'dark'
}) {
  const [mounted, setMounted] = React.useState(false)
  const {theme: selectedtheme, systemTheme} = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDarkMode =
    forceColorTheme === 'dark' ||
    selectedtheme === 'dark' ||
    (selectedtheme === 'system' && systemTheme === 'dark')

  return (
    <div className="group relative">
      <Highlight
        {...defaultProps}
        code={code}
        language={language}
        theme={
          theme ?? isDarkMode
            ? (darkTheme as PrismTheme)
            : (lightTheme as PrismTheme)
        }
      >
        {({className, style, tokens, getLineProps, getTokenProps}) => (
          <div
            className={cx(
              classNameProp,
              'rounded-xl bg-black/5 shadow-outline dark:bg-white/5',
            )}
          >
            <div className="flex px-4 py-3">
              <div className="mr-2 h-3 w-3 rounded-full bg-red-500" />
              <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <CopyButton code={code} />
            <pre
              className={cx(
                className,
                'relative my-5 mx-auto overflow-x-auto pt-0 pb-5 pr-8 text-sm leading-relaxed ',
                {
                  'pl-4': !showLineNumbers,
                  'pl-16': showLineNumbers,
                },
              )}
              style={style}
            >
              {tokens.map((line, i) => {
                if (i === tokens.length - 1 && line.length === 0) return null

                const tokenProps = getLineProps({line, key: i})

                return (
                  <div {...tokenProps} key={tokenProps.key}>
                    {showLineNumbers ? (
                      <span className="text-primary-300 absolute left-0 mr-[16px] grid w-[40px] shrink-0 place-items-center">
                        {pad(i + 1)}
                      </span>
                    ) : null}
                    {line.length === 0 ? <span>&#8203;</span> : null}
                    {line.map((token, key) => (
                      <span {...getTokenProps({token, key})} key={key} />
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
          </div>
        )}
      </Highlight>
    </div>
  )
}

export {CodeBlock, type CodeBlockLanguage}
