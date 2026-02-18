import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin'
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin'
import { defineConfig } from '@lynx-js/rspeedy'
import { pluginSass } from '@rsbuild/plugin-sass'
import { pluginTypeCheck } from '@rsbuild/plugin-type-check'
import { tanstackRouter } from '@tanstack/router-plugin/rspack'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  source: {
    entry: {
      main: resolve(__dirname, 'src/app/index.tsx'),
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'react$': resolve(__dirname, 'src/shared/config/shims/react.ts'),
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
    rspack: {
      plugins: [
        tanstackRouter({
          target: 'react',
          autoCodeSplitting: false,
          routesDirectory: resolve(__dirname, 'src/app/routes'),
          generatedRouteTree: resolve(__dirname, 'src/app/routes/route-tree.gen.ts'),
          routeFileIgnorePattern: '(router|route-tree\\.gen|\\.test)\\.tsx?$',
        }),
      ],
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
