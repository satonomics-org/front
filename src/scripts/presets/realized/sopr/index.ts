import { applyPreset } from './apply'

import description from './description.md?raw'

export const soprPreset = {
  id: 'sopr',
  title: 'SOPR',
  apply: applyPreset,
  description,
}
