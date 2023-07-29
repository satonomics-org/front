import { colors } from '/src/scripts'

import { applyPreset } from './apply'

import description from './description.md?raw'

export const fishRealizedPriceColor = colors.lime

export const fishPreset = {
  id: 'fish',
  title: 'Fish Realized Price',
  apply: applyPreset,
  description,
}
