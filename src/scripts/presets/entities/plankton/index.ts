import { colors } from '/src/scripts'

import { applyPreset } from './apply'

import description from './description.md?raw'

export const planktonRealizedPriceColor = colors.emerald

export const planktonPreset = {
  id: 'plankton',
  title: 'Plankton Realized Price',
  apply: applyPreset,
  description,
}
