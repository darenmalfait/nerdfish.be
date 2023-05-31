import {cache} from 'react'
import {Lang, getHighlighter as shikiGetHighlighter} from 'shiki'

import {CopyButton} from './copy-button'

const highlighterPromise = shikiGetHighlighter({})

const getHighlighter = cache(async (language: string) => {
  const highlighter = await highlighterPromise
  const loadedLanguages = highlighter.getLoadedLanguages()

  const promises = []
  if (!loadedLanguages.includes(language as Lang)) {
    promises.push(highlighter.loadLanguage(language as Lang))
  }

  promises.push(highlighter.loadTheme('github-dark'))

  await Promise.all(promises)

  return highlighter
})

interface CodeProps {
  code: string
  lang?: string
}

async function Code({code, lang = 'typescript'}: CodeProps) {
  const highlighter = await getHighlighter(lang)

  const html = highlighter.codeToHtml(code, {
    lang,
    theme: 'github-dark',
  })

  return (
    <div className="rounded-xl bg-black/5 shadow-outline dark:bg-white/5">
      <div className="flex px-4 py-3">
        <div className="mr-2 h-3 w-3 rounded-full bg-red-500" />
        <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
      </div>
      <div className="relative -mt-8">
        <CopyButton value={code} className="absolute right-2 top-4" />
        <div dangerouslySetInnerHTML={{__html: html}} />
      </div>
    </div>
  )
}

export {Code}
