import { colors, createLineSeries, resetLeftPriceScale } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, {
    visible: true,
    scaleMargins: {
      bottom: 0,
      top: 0.75,
    },
  })

  const all = createLineSeries(chart, {
    color: colors.white,
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

  sthSupply.fetch()
  sthInProfit.fetch()
  sthInLoss.fetch()

  createEffect(() => {
    all.setData(sthSupply.values() || [])
    profit.setData(sthInProfit.values() || [])
    loss.setData(sthInLoss.values() || [])
  })
}
