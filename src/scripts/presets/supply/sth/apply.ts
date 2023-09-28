import {
  colors,
  createHistogramSeries,
  createLineSeries,
  resetLeftPriceScale,
} from '/src/scripts'

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

  // const momentum = createHistogramSeries(chart, {
  //   priceScaleId: undefined,
  // })

  const { sthSupply, sthInProfit, sthInLoss, sthReturnsMomentum } = datasets

  createEffect(() => all.setData(sthSupply.values() || []))
  createEffect(() => profit.setData(sthInProfit.values() || []))
  createEffect(() => loss.setData(sthInLoss.values() || []))
  // createEffect(() =>
  //   momentum.setData(
  //     (sthReturnsMomentum.values() || []).map(({ date, time, value }) => ({
  //       date,
  //       time,
  //       value: 1,
  //       color: value ? colors.up : colors.down,
  //     })),
  //   ),
  // )

  return {
    halved: true,
  }
}
