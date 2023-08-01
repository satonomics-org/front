import { applyPreset } from './apply'

import description from './description.md?raw'

export const realizedPricePreset = {
  id: 'realized',
  title: 'Realized Price',
  apply: applyPreset,
  description,
}
