import { applyPreset } from './apply'

import description from './description.md?raw'

export const hashratePreset = {
  id: 'hashrate',
  title: 'Hashrate',
  description,
  apply: applyPreset,
}
