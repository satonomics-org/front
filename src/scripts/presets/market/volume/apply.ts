import {
  colors,
  computeMonthlyMovingAverage,
  convertCandleToColor,
  createHistogramSeries,
  createLineSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, {
    visible: true,
    scaleMargins: {
      top: 0.8,
      bottom: 0,
    },
  })

  const volume = createHistogramSeries(chart)

  const ma = createLineSeries(chart, {
    color: `${colors.white}88`,
    priceScaleId: 'left',
  })

  const candlesticks = datasets.candlesticks.values()

  createEffect(() => {
    const dataset = (candlesticks || []).map((candle) => {
      const color = `${convertCandleToColor(candle)}88`

      return {
        time: candle.time,
        value: candle.volume,
        color,
      }
    })

    volume.setData(dataset)

    ma.setData(
      computeMonthlyMovingAverage(dataset).map((data) => ({
        time: data.time,
        value: data.value,
      })),
    )
  })
}
