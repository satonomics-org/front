import { colors } from '/src/scripts'

import { applyPreset } from './apply'

import description from './description.md?raw'

export const cvddColor = colors.lime

export const cvddPreset = {
  id: 'cvdd',
  title: 'CVDD Price',
  apply: applyPreset,
  description,
}
