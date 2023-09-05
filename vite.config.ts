import { faviconsPlugin } from '@darkobits/vite-plugin-favicons'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import unpluginAutoImport from 'unplugin-auto-import/vite'
import unpluginIconsResolver from 'unplugin-icons/resolver'
import unpluginIcons from 'unplugin-icons/vite'
// @ts-ignore
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import solidPlugin from 'vite-plugin-solid'
import solidSvg from 'vite-plugin-solid-svg'

import packageJSON from './package.json'

// import devtools from 'solid-devtools/vite';

const logoBlack = './src/assets/svgs/logo/black.svg'
const logoWhite = './src/assets/svgs/logo/white.svg'
const black = '#000000'

export default defineConfig({
  plugins: [
    solidPlugin(),

    solidSvg(),

    // VitePWA({
    //   registerType: 'autoUpdate',
    //   manifest: false,
    //   workbox: {
    //     skipWaiting: true,
    //     globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff2,ttf}'],
    //     runtimeCaching: [
    //       {
    //         urlPattern: ({ url }) => {
    //           const networkFirst =
    //             url.origin === 'https://sholong.shuttleapp.rs' ||
    //             url.origin === 'https://api.kraken.com'

    //           if (networkFirst) {
    //             console.log('network first', url)
    //           } else {
    //             console.log('not network first', url)
    //           }

    //           return networkFirst
    //         },
    //         handler: 'NetworkFirst',
    //         options: {
    //           cacheName: 'api-cache',
    //         },
    //       },
    //     ],
    //   },
    // }),

    unpluginAutoImport({
      imports: ['solid-js', '@solidjs/router'],
      dts: './src/types/auto-imports.d.ts',
      resolvers: [
        unpluginIconsResolver({
          prefix: 'Icon',
          extension: 'jsx',
        }),
      ],
    }),

    unpluginIcons({ autoInstall: true, compiler: 'solid' }),

    faviconsPlugin({
      appName: packageJSON.name[0].toUpperCase() + packageJSON.name.slice(1),
      appDescription: packageJSON.description,
      start_url: '',
      theme_color: black,
      cache: true,
      background: black,
      icons: {
        favicons: {
          source: logoWhite,
          background: black,
          offset: 5,
        },
        android: {
          source: logoWhite,
          background: black,
          offset: 10,
        },
        appleIcon: {
          background: black,
          source: logoWhite,
          offset: 10,
        },
        appleStartup: {
          background: black,
          source: logoWhite,
          offset: 15,
        },
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '/src': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer(), tailwindcss()],
    },
  },
})
