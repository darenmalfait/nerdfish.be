import fs from 'fs/promises'
import path from 'path'

import parseFrontMatter from 'front-matter'
import { marked } from 'marked'
import invariant from 'tiny-invariant'

type WikiPageMarkdownAttributes = {
  title: string
  tags?: string[]
  description?: string
  date: string
}

function isValidWikiPageAttributes(
  attributes: any,
): attributes is WikiPageMarkdownAttributes {
  return attributes?.title
}

type WikiPage = WikiPageMarkdownAttributes & {
  slug: string
  html?: string
}

// relative to the server output not the source!
const wikiPagesPath = path.join(__dirname, 'content', 'wiki')

async function getWikiPages() {
  const dir = await fs.readdir(wikiPagesPath)
  return Promise.all(
    dir.map(async filename => {
      const file = await fs.readFile(path.join(wikiPagesPath, filename))
      const { attributes } = parseFrontMatter(file.toString())
      invariant(
        isValidWikiPageAttributes(attributes),
        `${filename} has bad meta data!`,
      )
      return {
        slug: filename.replace(/\.md$/, ''),
        ...attributes,
      }
    }),
  )
}

async function getWikiPage(slug: string) {
  const filepath = path.join(wikiPagesPath, `${slug}.md`)
  const file = await fs.readFile(filepath)
  const { attributes, body } = parseFrontMatter(file.toString())

  invariant(
    isValidWikiPageAttributes(attributes),
    `WikiPage ${filepath} is missing attributes`,
  )

  const html = marked(body)

  return { slug, html, ...attributes }
}

export { getWikiPages, getWikiPage }
export type { WikiPage, WikiPageMarkdownAttributes }
