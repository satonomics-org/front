import { applyPreset } from './apply'

import description from './description.md?raw'

export const allHoldersPreset = {
  id: 'allHolders',
  title: 'All Holders Realized Prices',
  apply: applyPreset,
  description,
}
