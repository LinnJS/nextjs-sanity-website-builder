export default {
  widgets: [
    // {
    //   name: 'sanity-tutorials',
    //   options: {
    //     templateRepoId: 'sanity-io/sanity-template-nextjs-landing-pages'
    //   }
    // },
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '6239c98927c6df66ccf15426',
                  title: 'Sanity Studio',
                  name: 'sanity-nextjs-landing-pages-studio-zv12a5zx',
                  apiId: '03efd39a-ce76-4e7b-981b-b8801c8ee393'
                },
                {
                  buildHookId: '6239c98a27c6df6d72f15448',
                  title: 'Landing pages Website',
                  name: 'sanity-nextjs-landing-pages-web-t21cf7yh',
                  apiId: 'df02dd88-893e-4c0a-ac63-267d8c7cb7b0'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/LinnJS/sanity-nextjs-landing-pages',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://sanity-nextjs-landing-pages-web-t21cf7yh.netlify.app', category: 'apps' }
        ]
      }
    },
    {
      name: 'document-list',
      options: { title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['page'] },
      layout: { width: 'medium' }
    },
    { name: 'project-users', layout: { height: 'auto' } }
  ]
}
