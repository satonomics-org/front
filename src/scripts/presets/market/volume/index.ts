import { applyPreset } from './apply'

import description from './description.md?raw'

export const marketVolumePreset = {
  id: 'marketVolume',
  title: 'Market Volume',
  apply: applyPreset,
  description,
}
