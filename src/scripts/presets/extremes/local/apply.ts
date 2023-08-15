import { colors } from '/src/scripts'

import { applyExtremesPreset } from '../utils'

export const applyPreset: ApplyPreset = ({ chart, datasets, titlesPrefix }) =>
  applyExtremesPreset(
    chart,
    [
      datasets.oneMonthRealizedPrice,
      datasets.threeMonthsRealizedPrice,
      datasets.sthRealizedPrice,
      datasets.sixMonthsRealizedPrice,
      datasets.monthlyMA,
      datasets.weeklyMA,
    ],
    {
      99.9: colors.red,
      99.5: colors.orange,
      99: colors.yellow,
      97.5: `${colors.yellow}88`,
      2.5: `${colors.yellow}88`,
      1: colors.yellow,
      0.5: colors.orange,
      0.1: colors.red,
    },
    titlesPrefix,
  )
