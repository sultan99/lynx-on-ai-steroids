import { getQueriesForElement } from '@lynx-js/react/testing-library'

export const getRoot = () => {
  const root = elementTree.root
  if (!root) throw new Error('root not rendered')
  return root
}

export const queryRoot = () => getQueriesForElement(getRoot())
