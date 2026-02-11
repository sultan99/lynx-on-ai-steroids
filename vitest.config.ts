import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createVitestConfig } from '@lynx-js/react/testing-library/vitest-config'
import { defineConfig, mergeConfig } from 'vitest/config'

const __dirname = dirname(fileURLToPath(import.meta.url))

const defaultConfig = await createVitestConfig()
const config = defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {},
})

export default mergeConfig(defaultConfig, config)
