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

  const { lthSupply, lthInProfit, lthInLoss } = datasets

  lthSupply.fetch()
  lthInProfit.fetch()
  lthInLoss.fetch()

  createEffect(() => {
    all.setData(
      (lthSupply.values() || []).map((data) => ({
        ...data,
      })),
    )

    profit.setData(
      (lthInProfit.values() || []).map((data) => ({
        ...data,
      })),
    )

    loss.setData(
      (lthInLoss.values() || []).map((data) => ({
        ...data,
      })),
    )
  })

  return {
    halved: true,
  }
}
