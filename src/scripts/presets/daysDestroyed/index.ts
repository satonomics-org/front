import { allDDPreset } from './all'
import { balancedPreset } from './balanced'
import { cvddPreset } from './cvdd'
import { terminalPreset } from './terminal'
import { vddPreset } from './vdd'

export const daysDestroyedPresetsGroup = {
  name: 'Days destroyed',
  list: [allDDPreset, balancedPreset, cvddPreset, terminalPreset, vddPreset],
}
