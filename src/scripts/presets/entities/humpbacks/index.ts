import { colors } from '/src/scripts'

import { applyPreset } from './apply'

import description from './description.md?raw'

export const humpbacksRealizedPriceColor = colors.violet

export const humpbacksPreset = {
  id: 'humpbacks',
  title: 'Humpbacks Realized Price',
  apply: applyPreset,
  description,
}
