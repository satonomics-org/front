import { colors } from '/src/scripts'

import { applyPreset } from './apply'

import description from './description.md?raw'

export const crabsRealizedPriceColor = colors.red

export const crabsPreset = {
  id: 'crabs',
  title: 'Crabs Realized Price',
  apply: applyPreset,
  description,
}
