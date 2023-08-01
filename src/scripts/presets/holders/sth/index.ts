import { applyPreset } from './apply'

import description from './description.md?raw'

export const sthPreset = {
  id: 'sth',
  title: 'Short Term Holders',
  apply: applyPreset,
  description,
}