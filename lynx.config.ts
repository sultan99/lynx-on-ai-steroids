import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin'
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin'
import { defineConfig } from '@lynx-js/rspeedy'
import { loadEnv } from '@rsbuild/core'
import { pluginSass } from '@rsbuild/plugin-sass'
import { pluginTypeCheck } from '@rsbuild/plugin-type-check'
import { tanstackRouter } from '@tanstack/router-plugin/rspack'
import { NormalModuleReplacementPlugin } from '@rspack/core'

const __dirname = dirname(fileURLToPath(import.meta.url))
const env = loadEnv({ prefixes: ['MAPS_'] })
const apiEnv = loadEnv({ prefixes: ['API_'] })

export default defineConfig({
  source: {
    define: {
      ...env.publicVars,
      __API_URL__: JSON.stringify(apiEnv.rawPublicVars.API_URL ?? ''),
    },
    entry: {
      main: resolve(__dirname, 'src/app/index.tsx'),
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@api': resolve(__dirname, 'api'),
      react$: resolve(__dirname, 'src/shared/config/shims/react.ts'),
      '@tanstack/router-core/isServer': resolve(
        __dirname,
        'node_modules/@tanstack/router-core/dist/esm/isServer/client.js',
      ),
    },
  },
  output: {
    minify: false,
  },
  tools: {
    cssLoader: {
      modules: {
        namedExport: true,
        exportLocalsConvention: 'camelCaseOnly',
      },
    },
    rspack(config) {
      config.plugins ??= []
      config.plugins.push(
        new NormalModuleReplacementPlugin(
          /wsLink-.*\.mjs$/,
          resolve(__dirname, 'src/shared/config/shims/trpc-wslink.ts'),
        ),
        tanstackRouter({
          target: 'react',
          autoCodeSplitting: false,
          routesDirectory: resolve(__dirname, 'src/app/routes'),
          generatedRouteTree: resolve(
            __dirname,
            'src/app/routes/__route-tree.gen.ts',
          ),
          routeFileIgnorePattern: '(router|__route-tree\\.gen|\\.test)\\.tsx?$',
        }),
      )
    },
  },
  plugins: [
    pluginQRCode({
      schema(url) {
        return `${url}?fullscreen=true`
      },
    }),
    pluginReactLynx(),
    pluginSass(),
    pluginTypeCheck({
      forkTsCheckerOptions: {
        issue: { exclude: [{ file: '**/*.test.{ts,tsx}' }] },
      },
    }),
  ],
})
