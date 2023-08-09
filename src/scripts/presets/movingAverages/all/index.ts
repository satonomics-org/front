import { applyPreset } from './apply'

import description from './description.md?raw'

export const allMovingAveragesPreset = {
  id: 'allMAs',
  title: 'All Moving Averages',
  apply: applyPreset,
  description,
}
