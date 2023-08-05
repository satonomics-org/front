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
    color: `${colors.pink}88`,
    options: {
      priceScaleId: 'left',
      autoscaleInfoProvider: percentageAutoscaleInfoProvider,
    },
  })

  const { supplyInLoss } = datasets

  supplyInLoss.fetch()

  createEffect(() => series.setData(supplyInLoss.values() || []))
}
