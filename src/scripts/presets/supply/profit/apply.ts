import { colors, createLineSeries, resetLeftPriceScale } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, {
    visible: true,
    halved: true,
  })

  const all = createLineSeries(chart, {
    color: colors.white(),
    priceScaleId: 'left',
    title: 'All',
  })

  const sth = createLineSeries(chart, {
    color: colors.sth,
    priceScaleId: 'left',
    title: 'STH',
  })

  const lth = createLineSeries(chart, {
    color: colors.lth,
    priceScaleId: 'left',
    title: 'LTH',
  })

  const { supplyInProfit, sthInProfit, lthInProfit } = datasets

  createEffect(() => all.setData(supplyInProfit.values() || []))
  createEffect(() => lth.setData(lthInProfit.values() || []))
  createEffect(() => sth.setData(sthInProfit.values() || []))

  return {
    halved: true,
  }
}
