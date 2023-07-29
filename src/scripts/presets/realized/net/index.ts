import { applyPreset } from './apply'

import description from './description.md?raw'

export const netRealizedPreset = {
  id: 'netP&L',
  title: 'Net Realized Profit & Loss',
  apply: applyPreset,
  description,
}
