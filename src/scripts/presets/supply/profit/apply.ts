import {
  colors,
  createAreaSeries,
  percentageAutoscaleInfoProvider,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, {
    visible: true,
    scaleMargins: {
      bottom: 0,
      top: 0,
    },
  })

  const series = createAreaSeries({
    chart,
    color: `${colors.teal}66`,
    options: {
      priceScaleId: 'left',
      autoscaleInfoProvider: percentageAutoscaleInfoProvider,
    },
  })

  const { supplyInProfit } = datasets

  supplyInProfit.fetch()

  createEffect(() => series.setData(supplyInProfit.values() || []))
}
