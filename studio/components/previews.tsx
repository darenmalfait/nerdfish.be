import * as React from 'react'
import tw from 'twin.macro'

import getPreviewUrl from '../utils/get-preview-url'

export const IFrame = tw.iframe`
  border-0
  h-full
  left-0
  absolute
  top-0
  w-full
`

interface JSONPreviewProps {
  options: {
    indentation: number
  }
  document: {
    displayed: any
  }
}

function JSONPreview({ options, document }: JSONPreviewProps) {
  const { displayed } = document
  const { indentation = 2 } = options
  const JSONstring = JSON.stringify(displayed, null, indentation)

  return <pre>{JSONstring}</pre>
}

interface PagePreviewProps {
  document: {
    displayed: any
  }
}

function PagePreview({ document: { displayed } }: PagePreviewProps) {
  if (!displayed) {
    return (
      <div>
        <p>There is no document to preview</p>
      </div>
    )
  }

  const url = getPreviewUrl(displayed)

  if (!url) {
    return (
      <div>
        <p>Hmm. Having problems constructing the web front-end URL.</p>
      </div>
    )
  }

  return (
    <div>
      <IFrame title="preview" src={url} frameBorder="0" />
    </div>
  )
}

export { JSONPreview, PagePreview }
