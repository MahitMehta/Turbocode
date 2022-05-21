import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    components: true,
    publicRuntimeConfig: {
        graphqlApiURL: process.env.GRAPHQL_API_URL || "http://localhost:3000/api/graphql",
    },
    ssr: true,
    vite: {
        server: {
            headers: {
                "Cross-Origin-Embedder-Policy": "require-corp"
            }
        }
    },
    app: {
        head: {
            title: 'Morb.it',
        },
    },
    css: ['@/assets/css/main.css'],
    vue: {
        compilerOptions: {
            comments: false,
        },
    },
    buildModules: [
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
        '@nuxt-hero-icons/solid/nuxt',
        '@nuxt-hero-icons/outline/nuxt'
    ],
    plugins: [
        "~/plugins/apolloClient.ts",
        "~/plugins/codemirror.client.ts",
        "~/plugins/fontawesome.ts",
        "~/plugins/eventBus.client.ts"
    ],
    nitro: {
        serveStatic: true,
        handlers: [
            {
                middleware: true,
                route: "/",
                handler: "~/middleware/set-same-origin-headers.ts"
            }
        ]
    },
    build: {
        transpile: [
            '@fortawesome/vue-fontawesome',
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/pro-solid-svg-icons',
            '@fortawesome/pro-regular-svg-icons',
            '@fortawesome/free-brands-svg-icons'
        ],
    },
    tailwindcss: {
        configPath: 'tailwind.config.js',
        cssPath: '~/assets/css/tailwind.css',
    }
})
