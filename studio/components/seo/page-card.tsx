import { H1, Paragraph, ThemeProvider } from '@daren/ui-components'
import React from 'react'

import logo from '../../assets/logo.svg'
import type { EditorLayout } from '../types'

interface LayoutProps {
  title?: string
  description?: string
}

function Component({ title, description }: LayoutProps) {
  return (
    <ThemeProvider>
      <div className="dark flex justify-center items-center p-4 h-full font-sans text-center bg-[#212123]">
        <div className="space-y-8 w-full max-w-[800px]">
          <div className="block mx-auto w-32">
            <img src={logo} alt="logo" />
          </div>
          <H1 className="font-title font-black">{title || 'Title'}</H1>
          {description && <Paragraph>{description}</Paragraph>}
        </div>
      </div>
    </ThemeProvider>
  )
}

const pageCardLayout: EditorLayout<LayoutProps> = {
  name: 'pageSeoCard',
  title: 'Page Seo Card',
  component: Component,
  prepare: (document: any) => {
    return {
      title: document.seo?.title || document.title,
      description: document.seo?.description ?? '',
    }
  },
  fields: [
    {
      title: 'Post title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
    },
  ],
  dimensions: {
    width: 1200,
    height: 630,
  },
}

export { pageCardLayout }
