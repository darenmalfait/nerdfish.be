/* eslint-disable sort-keys */
export default {
  widgets: [
    {
      name: 'structure-menu',
    },
    {
      name: 'netlify',
      options: {
        title: 'My Netlify deploys',
        sites: [
          {
            title: 'Website',
            buildHookId: process.env.SANITY_STUDIO_NETLIFY_WEBHOOK_ID,
            apiId: process.env.SANITY_STUDIO_NETLIFY_PROJECT_ID,
            url: process.env.SANITY_STUDIO_PROJECT_URL,
          },
        ],
      },
    },
    {
      name: 'project-info',
    },
    {
      name: 'project-users',
    },
  ],
}
