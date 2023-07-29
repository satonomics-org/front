import { colors } from '/src/scripts'

import { applyPreset } from './apply'

import description from './description.md?raw'

export const lthRealizedPriceColor = colors.cyan

export const lthPreset = {
  id: 'lth',
  title: 'Long Term Holders',
  apply: applyPreset,
  description,
}
