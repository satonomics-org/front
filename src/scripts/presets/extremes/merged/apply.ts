import { applyPreset as applyCyclePreset } from '../cycle/apply'
import { applyPreset as applyLocalPreset } from '../local/apply'
import { applyExtremesPreset } from '../utils'

export const applyPreset: ApplyPreset = ({ chart, datasets }) =>
  applyExtremesPreset(chart, [
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
    datasets.trueMeanPrice,
    datasets.cointimePrice,
    datasets.vaultedPrice,
    datasets.cvdd,
    datasets.yearlyMA,
    datasets.terminalPrice,
    datasets.oneMonthRealizedPrice,
    datasets.threeMonthsRealizedPrice,
    datasets.sthRealizedPrice,
    datasets.sixMonthsRealizedPrice,
    datasets.monthlyMA,
    datasets.weeklyMA,
  ])
