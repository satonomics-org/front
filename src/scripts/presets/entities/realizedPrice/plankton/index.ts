import { applyPreset } from './apply'

import description from './description.md?raw'

export const planktonRealizedPricePreset = {
  id: 'planktonRealizedPrice',
  title: 'Plankton Realized Price',
  apply: applyPreset,
  description,
}
