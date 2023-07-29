import { colors } from '/src/scripts'

import { applyPreset } from './apply'

import description from './description.md?raw'

export const sthRealizedPriceColor = colors.yellow

export const sthPreset = {
  id: 'sth',
  title: 'Short Term Holders',
  apply: applyPreset,
  description,
}
