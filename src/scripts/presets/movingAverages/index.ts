import { allMovingAveragesPreset } from './all'
import { monthlyMAPreset } from './monthly'
import { weeklyMAPreset } from './weekly'
import { yearlyMAPreset } from './yearly'

export const movingAveragesPresetsGroup = {
  name: 'Moving Averages',
  list: [
    allMovingAveragesPreset,
    weeklyMAPreset,
    monthlyMAPreset,
    yearlyMAPreset,
  ],
}
