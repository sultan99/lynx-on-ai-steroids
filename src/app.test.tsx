import '@testing-library/jest-dom'
import { getQueriesForElement, render } from '@lynx-js/react/testing-library'
import { expect, test, vi } from 'vitest'
import { App } from './app.jsx'

test('App', async () => {
  const cb = vi.fn()

  render(
    <App
      onRender={() => {
        cb(`__MAIN_THREAD__: ${__MAIN_THREAD__}`)
      }}
    />,
  )
  expect(cb).toBeCalledTimes(1)
  expect(cb.mock.calls).toMatchInlineSnapshot(`
    [
      [
        "__MAIN_THREAD__: false",
      ],
    ]
  `)
  expect(elementTree.root).toMatchInlineSnapshot(`
    <page>
      <view>
        <view
          class="Background"
        />
        <view
          class="App"
        >
          <view
            class="Banner"
          >
            <view
              class="Logo"
            >
              <image
                class="Logo--lynx"
                src="/src/assets/lynx-logo.png"
              />
            </view>
            <text
              class="Title"
            >
              React
            </text>
            <text
              class="Subtitle"
            >
              on Lynx
            </text>
          </view>
          <view
            class="Content"
          >
            <image
              class="Arrow"
              src="/src/assets/arrow.png"
            />
            <text
              class="Description"
            >
              Tap the logo and have fun!
            </text>
            <text
              class="Hint"
            >
              Welcome!
              <text
                style="font-style:italic;color:rgba(255, 255, 255, 0.85)"
              >
                 src/app.tsx
              </text>
              to see updates!
            </text>
          </view>
          <view
            style="flex:1"
          />
        </view>
      </view>
    </page>
  `)
  const { findByText } = getQueriesForElement(elementTree.root!)
  const element = await findByText('Tap the logo and have fun!')
  expect(element).toBeInTheDocument()
  expect(element).toMatchInlineSnapshot(`
    <text
      class="Description"
    >
      Tap the logo and have fun!
    </text>
  `)
})
