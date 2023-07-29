import { colors } from '/src/scripts'

import { applyPreset } from './apply'

import description from './description.md?raw'

export const balancedPriceColor = colors.yellow

export const balancedPreset = {
  id: 'balanced',
  title: 'Balanced Price',
  apply: applyPreset,
  description,
}
