import { getDirname, path } from '@vuepress/utils'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig  } from 'vuepress';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
    lang: 'en-US',
    title: 'My Project',
    description: 'My Project',
    port: 9001,
    bundler: viteBundler(),
    theme: defaultTheme({
        logo: '/images/nav.png',
        repo: 'https://dev.azure.com/wundermanio/catalyst-shared/_git/cat-ui-wrapper-vue3',
        repoLabel: 'Repo',
        contributors: false,
        lastUpdated: false,
        navbar: [
            {
                text: 'Guide',
                link: '/guide/Introduction',
            },
        ],
        sidebar: [
            {
                text: 'Guide',
                children: [
                    {
                        text: 'Introduction',
                        link: '/guide/Introduction'
                    },
                    {
                        text: 'Getting Started',
                        link: '/guide/GettingStarted'
                    },
                ],
            },
          ],
    }),
    plugins: [
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, './examples'),
        }),
    ],
})
