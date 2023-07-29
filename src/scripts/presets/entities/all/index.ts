import { applyPreset } from './apply'

import description from './description.md?raw'

export const allEntitiesPreset = {
  id: 'allEntities',
  title: 'All Entities',
  apply: applyPreset,
  description,
}
