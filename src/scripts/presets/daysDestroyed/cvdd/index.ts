import { applyPreset } from './apply'

import description from './description.md?raw'

export const cvddPreset = {
  id: 'cvdd',
  title: 'CVDD Price',
  apply: applyPreset,
  description,
}
