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
          class=""
        />
        <view
          class=""
        >
          <view
            class=""
          >
            <view
              class=""
            >
              <image
                class=""
                src="/src/assets/lynx-logo.png"
              />
            </view>
            <text
              class=""
            >
              React
            </text>
            <text
              class=""
            >
              on Lynx
            </text>
          </view>
          <view
            class=""
          >
            <image
              class=""
              src="/src/assets/arrow.png"
            />
            <text
              class=""
            >
              Tap the logo and have fun!
            </text>
            <view
              class=""
            >
              <wrapper>
                <text
                  class=""
                  style="font-family: icons; font-size: 13px; width: 13px; height: 13px; color: gray;"
                >
                  
                </text>
              </wrapper>
              <text>
                Read more about Lynx
              </text>
            </view>
          </view>
          <view
            style="flex:1"
          />
        </view>
      </view>
    </page>
  `)
  const root = elementTree.root
  if (!root) throw new Error('root not rendered')
  const { findByText } = getQueriesForElement(root)
  const element = await findByText('Tap the logo and have fun!')
  expect(element).toBeInTheDocument()
  expect(element).toMatchInlineSnapshot(`
    <text
      class=""
    >
      Tap the logo and have fun!
    </text>
  `)
})
