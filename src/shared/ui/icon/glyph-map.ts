export type IconGlyph =
  | 'arrow-left'
  | 'bookmark'
  | 'clock'
  | 'close'
  | 'filter'
  | 'flame'
  | 'heart'
  | 'heart-filled'
  | 'home'
  | 'location-pin'
  | 'map-pin'
  | 'menu'
  | 'minus'
  | 'phone'
  | 'plus'
  | 'search'
  | 'star'
  | 'star-filled'
  | 'truck'
  | 'user'

export const glyphMap: Record<IconGlyph, string> = {
  'arrow-left': '\uE001',
  bookmark: '\uE002',
  clock: '\uE003',
  close: '\uE004',
  filter: '\uE005',
  flame: '\uE006',
  heart: '\uE008',
  'heart-filled': '\uE007',
  home: '\uE009',
  'location-pin': '\uE00A',
  'map-pin': '\uE00B',
  menu: '\uE00C',
  minus: '\uE00D',
  phone: '\uE00E',
  plus: '\uE00F',
  search: '\uE010',
  star: '\uE012',
  'star-filled': '\uE011',
  truck: '\uE013',
  user: '\uE014',
}
