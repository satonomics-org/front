import { colors } from '/src/scripts'

import { applyExtremesPreset } from '../utils'

export const applyPreset: ApplyPreset = ({ chart, datasets }) =>
  applyExtremesPreset(chart, [
    datasets.oneMonthRealizedPrice,
    datasets.threeMonthsRealizedPrice,
    datasets.sthRealizedPrice,
    datasets.sixMonthsRealizedPrice,
    datasets.monthlyMA,
    datasets.weeklyMA,
  ])
