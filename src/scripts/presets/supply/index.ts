import { lossPreset } from './loss'
import { lthPreset } from './lth'
import { profitPreset } from './profit'
import { sthPreset } from './sth'

export const supplyPresetsGroup = {
  name: 'Supply',
  list: [profitPreset, lossPreset, lthPreset, sthPreset],
}
