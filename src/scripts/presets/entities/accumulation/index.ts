import { generateApplyPreset } from './apply'
import description from './description.md?raw'

export const entities30DAccumulationPreset = {
  id: 'entities30DAccumulation',
  title: 'Entities 30D Accumulation',
  applyPreset: generateApplyPreset(30),
  description,
}

export const entities90DAccumulationPreset = {
  id: 'entities90DAccumulation',
  title: 'Entities 90D Accumulation',
  applyPreset: generateApplyPreset(90),
  description,
}
