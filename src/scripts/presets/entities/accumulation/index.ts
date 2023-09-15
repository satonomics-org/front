import { generateApplyPreset } from './apply'
import description from './description.md?raw'

export const entities30DBalanceChangePreset = {
  id: 'entities30DBalanceChange',
  title: 'Entities 30D Balance Change',
  applyPreset: generateApplyPreset('30DBalanceChanges'),
  description,
}

export const entities90BalanceChangePreset = {
  id: 'entities90DBalanceChange',
  title: 'Entities 90D Balance Change',
  applyPreset: generateApplyPreset('90DBalanceChanges'),
  description,
}
