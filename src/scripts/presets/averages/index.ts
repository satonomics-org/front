import { allAveragesPreset } from './all'
import { monthlyMAPreset } from './monthly'
import { weeklyMAPreset } from './weekly'
import { yearlyMAPreset } from './yearly'

export const averagesPresetsGroup = {
  name: 'Moving Averages',
  list: [allAveragesPreset, weeklyMAPreset, monthlyMAPreset, yearlyMAPreset],
}
