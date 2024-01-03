'use client'

import * as React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {a11yDark} from 'react-syntax-highlighter/dist/esm/styles/hljs'

import {CopyButton} from './copy-button'

interface CodeProps {
  code: string
  lang?: string
}

async function Code({code, lang = 'typescript'}: CodeProps) {
  return (
    <div className="rounded-xl bg-black/5 shadow-outline dark:bg-white/5">
      <div className="flex px-4 py-3">
        <div className="mr-2 h-3 w-3 rounded-full bg-red-500" />
        <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
      </div>
      <div className="relative -mt-8">
        <CopyButton value={code} className="absolute right-2 top-4" />
        <SyntaxHighlighter language={lang} style={a11yDark}>
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export {Code}
