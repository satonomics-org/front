import { colors } from '/src/scripts'

import { applyPreset } from './apply'

import description from './description.md?raw'

export const twoYearRealizedPriceColor = colors.purple

export const upTo2YearPreset = {
  id: '<2y',
  title: '<2Y Holders',
  apply: applyPreset,
  description,
}
