import { colors, createLineSeries, resetLeftPriceScale } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, {
    visible: true,
    halved: true,
  })

  const all = createLineSeries(chart, {
    color: colors.white(),
    priceScaleId: 'left',
    title: 'STH',
  })

  const loss = createLineSeries(chart, {
    color: colors.loss,
    priceScaleId: 'left',
    title: 'Loss',
  })

  const profit = createLineSeries(chart, {
    color: colors.profit,
    priceScaleId: 'left',
    title: 'Profit',
  })

  const { sthSupply, sthInProfit, sthInLoss } = datasets

  createEffect(() => all.setData(sthSupply.values() || []))
  createEffect(() => profit.setData(sthInProfit.values() || []))
  createEffect(() => loss.setData(sthInLoss.values() || []))

  return {
    halved: true,
  }
}
