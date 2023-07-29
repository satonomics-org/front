import { colors } from '/src/scripts'

import { applyPreset } from './apply'

import description from './description.md?raw'

export const sharksRealizedPriceColor = colors.teal

export const sharksPreset = {
  id: 'sharks',
  title: 'Sharks Realized Price',
  apply: applyPreset,
  description,
}
