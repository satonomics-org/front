import {
  chartState,
  colors,
  computeMonthlyMovingAverage,
  convertCandleToColor,
  createHistogramSeries,
  createLineSeries,
  darken,
  resetLeftPriceScale,
} from '/src/scripts'

export const generateApplyPreset =
  (volumeInDollars = false): ApplyPreset =>
  ({ chart, datasets }) => {
    resetLeftPriceScale(chart, {
      visible: true,
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    })

    const volume = createHistogramSeries(chart)

    const isMainSeriesCandlesticks = chartState.seriesType !== 'Line'

    const ma = createLineSeries(chart, {
      color: isMainSeriesCandlesticks
        ? colors.yellow[500]
        : colors.neutral[200],
      priceScaleId: 'left',
    })

    createEffect(() => {
      const candlesticks = datasets.candlesticks.values()

      const dataset = (candlesticks || []).map((candle) => {
        const color = isMainSeriesCandlesticks
          ? darken(convertCandleToColor(candle), 0.33)
          : colors.neutral[600]

        return {
          date: candle.date,
          time: candle.time,
          value: (volumeInDollars ? candle.close : 1) * candle.volume,
          color,
        }
      })

      volume.setData(dataset)

      ma.setData(computeMonthlyMovingAverage(dataset))
    })

    return {
      lowerOpacity: false,
    }
  }
