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
      99.9: colors.violet,
      99.5: colors.fuchsia,
      99: colors.pink,
      97.5: `${colors.pink}88`,
      2.5: `${colors.pink}88`,
      1: colors.pink,
      0.5: colors.fuchsia,
      0.1: colors.violet,
    },
    titlesPrefix,
  )
