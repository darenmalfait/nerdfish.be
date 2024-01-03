module.exports = {
  projects: {
    web: {
      schema: ['apps/web/tina/__generated__/schema.gql'],
      documents: ['apps/web/**/*.gql', 'apps/web/**/*.ts', 'apps/web/**/*.tsx'],
    },
  },
}
