import { colors } from '/src/scripts'

import { applyExtremesPreset } from '../utils'

export const applyPreset: ApplyPreset = ({ chart, datasets, titlesPrefix }) =>
  applyExtremesPreset(
    chart,
    [
      datasets.oneYearRealizedPrice,
      datasets.realizedPrice,
      datasets.twoYearsRealizedPrice,
      datasets.lthRealizedPrice,
      datasets.planktonRealizedPrice,
      datasets.shrimpsRealizedPrice,
      datasets.crabsRealizedPrice,
      datasets.fishRealizedPrice,
      datasets.sharksRealizedPrice,
      datasets.whalesRealizedPrice,
      datasets.humpbacksRealizedPrice,
      datasets.balancedPrice,
      datasets.cvdd,
      datasets.yearlyMA,
      datasets.terminalPrice,
    ],
    {
      99.9: colors.violet[500],
      99.5: colors.fuchsia[500],
      99: colors.pink[500],
      97.5: `${colors.pink[500]}88`,
      2.5: `${colors.pink[500]}88`,
      1: colors.pink[500],
      0.5: colors.fuchsia[500],
      0.1: colors.violet[500],
    },
    titlesPrefix,
  )
