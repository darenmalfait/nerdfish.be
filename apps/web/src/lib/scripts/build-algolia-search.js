const fs = require('fs')
const path = require('path')

const algoliasearch = require('algoliasearch').default
const parseISO = require('date-fns/parseISO').default
const dotenv = require('dotenv')
const matter = require('gray-matter')
const padStart = require('lodash/padStart')
const shell = require('shelljs')
const invariant = require('tiny-invariant').default

const global = require('../../../content/global/index.json')

dotenv.config()

invariant(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  'Missing env var NEXT_PUBLIC_ALGOLIA_APP_ID',
)
invariant(process.env.ALGOLIA_ADMIN_KEY, 'Missing env var ALGOLIA_ADMIN_KEY')
invariant(
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
  'Missing env var NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY',
)
invariant(
  process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME,
  'Missing env var NEXT_PUBLIC_ALGOLIA_INDEX_NAME',
)

console.info('Building algolia index')

const rootPath = 'content'
const blogsRootFolder = path.join(rootPath, 'blogs')
const wikiRootFolder = path.join(rootPath, 'wiki')
const pagesRootFolder = path.join(rootPath, 'pages')

async function getMDXData(file, type) {
  const source = fs.readFileSync(file)
  const {data} = matter(source)

  const filename = path.basename(file, path.extname(file))

  let slug = filename

  switch (type) {
    case 'blog': {
      const {date} = data

      const d = parseISO(date)
      const year = d.getFullYear()
      const month = padStart((d.getMonth() + 1, 2).toString(), 2, '0')

      slug = `/${global.paths.blog}/${year}/${month}/${filename}`
      break
    }
    case 'wiki': {
      const {date} = data

      const d = parseISO(date)
      const year = d.getFullYear()
      const month = padStart((d.getMonth() + 1, 2).toString(), 2, '0')

      slug = `/${global.paths.wiki}/${year}/${month}/${filename}`
      break
    }
    default:
      break
  }

  return {
    ...data,
    slug,
    type,
  }
}

async function getMarkdownFiles(filePath, type) {
  const files = shell
    .ls('-R', filePath)
    .map(file => path.join(process.cwd(), filePath, file))
    .filter(file => file.match(/\.mdx?$/))

  const results = []
  for (const file of files) {
    results.push(getMDXData(file, type))
  }

  return Promise.all(results)
}

;(async () => {
  try {
    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
      process.env.ALGOLIA_ADMIN_KEY || '',
    )

    console.info(
      `Indexing blogs - ${process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}`,
    )
    const index = client.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME)

    const blogs = await getMarkdownFiles(blogsRootFolder, 'blog')
    const wiki = await getMarkdownFiles(wikiRootFolder, 'wiki')
    const pages = await getMarkdownFiles(pagesRootFolder, 'page')

    const json = [...blogs, ...wiki, ...pages]

    console.info(`[Items count 🚀]: ${json.length}`)
    console.info('[Saving on Algolia ⏰...]')

    await index.replaceAllObjects(json, {
      autoGenerateObjectIDIfNotExist: true,
      safe: true,
    })

    console.info('Search meta is ready ✅')
  } catch (error) {
    console.error(`[ERROR 🔥]:`, error)
  }
})()
