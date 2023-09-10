import { cycleExtremesPreset } from './cycle'
import { localExtremesPreset } from './local'
import { mergedExtremesPreset } from './merged'

export const extremesGroup = {
  name: 'Extremes',
  list: [cycleExtremesPreset, localExtremesPreset, mergedExtremesPreset],
}
