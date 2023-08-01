import { applyPreset } from './apply'

import description from './description.md?raw'

export const midPointPreset = {
  id: 'mid',
  title: 'Mid Point Price',
  apply: applyPreset,
  description,
}