import {
  colors,
  createHistogramSeries,
  createLineSeries,
  movingAverage,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, candlesticks }) => {
  resetLeftPriceScale(chart, {
    visible: true,
    scaleMargins: {
      top: 0.8,
      bottom: 0,
    },
  })

  const volume = createHistogramSeries({
    chart,
  })

  const ma = createLineSeries({
    chart,
    color: `${colors.white}88`,
    options: {
      priceScaleId: 'left',
    },
  })

  createEffect(() => {
    const dataset = (candlesticks || []).map((candle) => {
      const color = `${
        candle.close > candle.open ? colors.green : colors.red
      }88`

      return {
        time: candle.time,
        value: candle.volume,
        color,
      }
    })

    volume.setData(dataset)

    ma.setData(
      movingAverage(dataset, 30).map((data) => ({
        time: data.time,
        value: data.value,
      }))
    )
  })

  return [volume, ma]
}
