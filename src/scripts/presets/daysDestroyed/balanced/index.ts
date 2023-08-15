import { applyPreset } from './apply'

import description from './description.md?raw'

export const balancedPreset = {
  id: 'balanced',
  title: 'Balanced Price',
  applyPreset,
  description,
}
