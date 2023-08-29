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
      99.9: colors.red[500],
      99.5: colors.orange[500],
      99: colors.yellow[500],
      97.5: `${colors.yellow[500]}88`,
      2.5: `${colors.yellow[500]}88`,
      1: colors.yellow[500],
      0.5: colors.orange[500],
      0.1: colors.red[500],
    },
    titlesPrefix,
  )
