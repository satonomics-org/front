import { applyPreset } from './apply'

import description from './description.md?raw'

export const lthPreset = {
  id: 'lthSupply',
  title: 'Long Term Supply',
  description,
  apply: applyPreset,
}
