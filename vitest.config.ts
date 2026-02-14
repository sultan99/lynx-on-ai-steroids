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
  test: {
    setupFiles: ['src/test-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'cobertura'],
      include: ['src/**'],
      exclude: [
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'src/index.tsx',
        'src/query-client.ts',
        'src/routes/__root.tsx',
        'src/routes/route-tree.gen.ts',
        'src/routes/router.ts',
        'src/shims/**',
        'src/test-setup.ts',
      ],
    },
  },
})

export default mergeConfig(defaultConfig, config)
