import clsx from 'clsx'
import Highlight, {
  defaultProps,
  Language,
  PrismTheme,
} from 'prism-react-renderer'
import nightOwl from 'prism-react-renderer/themes/nightOwl'

import { ClipboardCopyButton } from './clipboard-copy-button'

function pad(num: number | string, size = 2) {
  num = num.toString()
  while (num.length < size) num = `0${num}`

  return num
}

type CodeBlockLanguage = Language

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
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <>
            <ClipboardCopyButton
              value={code}
              className="absolute top-3 right-3 z-10"
            />
            <pre
              className={clsx(
                classNameProp,
                className,
                'overflow-x-auto  relative py-5 pr-8 my-5 mx-auto text-sm leading-relaxed rounded-xl',
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
                  <div {...getLineProps({ line, key: i })}>
                    {showLineNumbers && (
                      <span className="grid absolute left-0 shrink-0 place-items-center mr-[16px] w-[40px] text-primary-300">
                        {pad(i + 1)}
                      </span>
                    )}
                    {line.length === 0 && <span>&#8203;</span>}
                    {line.map((token, key) => (
                      // eslint-disable-next-line react/jsx-key
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                )
              })}
              {showLanguage && (
                <span className="block sticky right-0 w-full text-xs text-right">
                  {language}
                </span>
              )}
            </pre>
          </>
        )}
      </Highlight>
    </div>
  )
}

export { CodeBlock }
export type { CodeBlockLanguage }
