import { lossPreset } from './loss'
import { profitPreset } from './profit'

export const supplyPresetsGroup = {
  name: 'Supply',
  list: [profitPreset, lossPreset],
}
