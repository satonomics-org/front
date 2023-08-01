import { applyPreset } from './apply'

import description from './description.md?raw'

export const lossPreset = {
  id: 'supplyInLoss',
  title: 'Supply In Loss',
  description,
  apply: applyPreset,
}
