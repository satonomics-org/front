import { colors } from '/src/scripts'

import { applyPreset } from './apply'

import description from './description.md?raw'

export const realizedPriceColor = colors.orange

export const realizedPricePreset = {
  id: 'realized',
  title: 'Realized Price',
  apply: applyPreset,
  description,
}
