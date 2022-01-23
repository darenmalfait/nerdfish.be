import fs from 'fs'
import path from 'path'

import chalk from 'chalk'
import * as inquirer from 'inquirer'
import { camelCase, capitalize, kebabCase } from 'lodash'

import { render } from './utils/render'

const DESTINATION_STUDIO = 'studio/schemas/page-blocks/'
const DESTINATION_WEB = 'app/components/'

const fromRoot = (...p): string => path.join(__dirname, '..', ...p)

const SKIP_FILES = ['node_modules', '.template.json']

function createDirectoryContents(
  templatePath: string,
  destination: string,
  blockName: string,
  params: { [key: string]: any },
  prefix?: boolean,
): void {
  const filesToCreate = fs.readdirSync(templatePath)
  filesToCreate.forEach(file => {
    const origFilePath = path.join(templatePath, file)
    const stats = fs.statSync(origFilePath)
    const fileName = prefix ? `${blockName}${file}` : file

    if (SKIP_FILES.indexOf(file) > -1) return

    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, 'utf8')
      const writePath = fromRoot(destination, fileName)

      contents = render(contents, params)
      fs.writeFileSync(writePath, contents, 'utf8')
      console.info(chalk.green(`${writePath} created`))
    } else if (stats.isDirectory()) {
      fs.mkdirSync(fromRoot(destination, fileName))

      createDirectoryContents(
        path.join(templatePath, fileName),
        destination,
        path.join(blockName, fileName),
        params,
        prefix,
      )
    }
  })
}

function addSchemaImport(blockName: string, fileName: string): void {
  const importsFile = fromRoot(DESTINATION_STUDIO, 'index.ts')

  fs.appendFile(importsFile, `export * from './${fileName}'`, err => {
    if (err) {
      console.error(err)
    } else {
      console.info(chalk.green(`${blockName} import added to blocks schema.`))
    }
  })

  const blocksFile = fromRoot('studio/schemas/modules/', 'page-blocks.ts')
  const data = fs.readFileSync(blocksFile).toString().split('\n')
  data.splice(12, 0, `    { type: '${blockName}' },`)
  const text = data.join('\n')

  fs.writeFile(blocksFile, text, err => {
    if (err) {
      console.error(err)
    } else {
      console.info(
        chalk.green(`${blockName} import added to page body blocks.`),
      )
    }
  })
}

function addBlockImport(
  schemaName: string,
  blockName: string,
  fileName: string,
): void {
  const componentsFile = fromRoot(DESTINATION_WEB, 'common/page-builder.tsx')
  const data = fs.readFileSync(componentsFile).toString().split('\n')
  data.splice(12, 0, `  ${schemaName}: ${blockName},`)
  data.splice(1, 0, `import { ${blockName} } from '../page-blocks/${fileName}'`)
  const text = data.join('\n')

  fs.writeFile(componentsFile, text, err => {
    if (err) {
      console.error(err)
    } else {
      console.info(
        chalk.green(`${blockName} import added to block components.`),
      )
    }
  })
}

async function createFiles(
  name: string,
  template: string,
  destination: string,
  params = {},
  prefix?: boolean,
) {
  const templatePath = path.join(__dirname, template)

  createDirectoryContents(templatePath, destination, name, params, prefix)
  return true
}

async function generateBlock() {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'name',
    },
  ])

  const schemaName = `${camelCase(name)}Block`
  const fileName = `${kebabCase(name)}-block`

  const schemaAdded = await createFiles(
    fileName,
    'templates/block/schema',
    DESTINATION_STUDIO,
    {
      blockName: schemaName,
      blockTitle: capitalize(camelCase(name)),
    },
    true,
  )

  if (schemaAdded) {
    addSchemaImport(schemaName, fileName)
  }

  const blockName = `${capitalize(camelCase(name))}Block`

  const blockAdded = await createFiles(
    fileName,
    'templates/block/web',
    `${DESTINATION_WEB}sections/`,
    {
      blockName,
    },
    true,
  )

  if (blockAdded) {
    addBlockImport(schemaName, blockName, fileName)
  }
}

generateBlock()
