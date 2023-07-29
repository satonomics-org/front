import { colors } from '/src/scripts'

import { applyPreset } from './apply'

import description from './description.md?raw'

export const whalesRealizedPriceColor = colors.blue

export const whalesPreset = {
  id: 'whales',
  title: 'Whales Realized Price',
  apply: applyPreset,
  description,
}
