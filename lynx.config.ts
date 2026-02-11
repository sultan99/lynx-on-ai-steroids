import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin'
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin'
import { defineConfig } from '@lynx-js/rspeedy'
import { pluginTypeCheck } from '@rsbuild/plugin-type-check'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  source: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  tools: {
    cssLoader: {
      modules: {
        namedExport: true,
        exportLocalsConvention: 'camelCaseOnly',
      },
    },
  },
  plugins: [
    pluginQRCode({
      schema(url) {
        return `${url}?fullscreen=true`
      },
    }),
    pluginReactLynx(),
    pluginTypeCheck(),
  ],
})
