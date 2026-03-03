import type { IconGlyph } from '@/shared/ui/icon/glyph-map'
import type { Category } from '../model/types'
import { queryOptions } from '@tanstack/react-query'
import { trpc } from '@/shared/api/trpc'
import { glyphMap } from '@/shared/ui/icon/glyph-map'

const isIconGlyph = (value: string): value is IconGlyph => value in glyphMap

const toCategory = (cat: {
  iconGlyph: string
  id: string
  name: string
}): Category => ({
  ...cat,
  iconGlyph: isIconGlyph(cat.iconGlyph) ? cat.iconGlyph : 'donut-classic',
})

export const categoryKeys = {
  all: ['categories'] as const,
  list: () => ['categories', 'list'] as const,
}

export const categoryListQueryOptions = queryOptions({
  queryFn: () => trpc.category.list.query(),
  queryKey: categoryKeys.list(),
  select: (data): Category[] => data.map(toCategory),
})
