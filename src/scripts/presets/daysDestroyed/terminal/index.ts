import { applyPreset } from './apply'

import description from './description.md?raw'

export const terminalPreset = {
  id: 'terminal',
  title: 'Terminal Price',
  apply: applyPreset,
  description,
}
