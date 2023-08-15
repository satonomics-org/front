import { allExtremesPreset } from './all'
import { cycleExtremesPreset } from './cycle'
import { localExtremesPreset } from './local'

export const extremesGroup = {
  name: 'Extremes',
  list: [allExtremesPreset, localExtremesPreset, cycleExtremesPreset],
}
