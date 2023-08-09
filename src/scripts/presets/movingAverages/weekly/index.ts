import { applyPreset } from './apply'

import description from './description.md?raw'

export const weeklyMAPreset = {
  id: 'weeklyMA',
  title: 'Weekly Moving Average',
  apply: applyPreset,
  description,
}
