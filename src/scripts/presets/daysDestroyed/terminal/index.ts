import { colors } from '/src/scripts'

import { applyPreset } from './apply'

import description from './description.md?raw'

export const terminalPriceColor = colors.red

export const terminalPreset = {
  id: 'terminal',
  title: 'Terminal Price',
  apply: applyPreset,
  description,
}
