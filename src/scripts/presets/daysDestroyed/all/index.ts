import { applyPreset } from './apply'

import description from './description.md?raw'

export const allDDPreset = {
  id: 'allDaysDestroyed',
  title: 'All indicators',
  apply: applyPreset,
  description,
}
