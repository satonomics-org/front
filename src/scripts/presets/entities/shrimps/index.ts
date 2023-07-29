import { colors } from '/src/scripts'

import { applyPreset } from './apply'

import description from './description.md?raw'

export const shrimpsRealizedPriceColor = colors.pink

export const shrimpsPreset = {
  id: 'shrimps',
  title: 'Shrimps Realized Price',
  apply: applyPreset,
  description,
}
