import { applyPreset } from './apply'

import description from './description.md?raw'

export const vddPreset = {
  id: 'vdd',
  title: 'VDD Multiple',
  apply: applyPreset,
  description,
}
