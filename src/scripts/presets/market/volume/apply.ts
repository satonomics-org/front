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
        top: 0.75,
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

    const candlesticks = datasets.candlesticks.values()

    createEffect(() => {
      const dataset = (candlesticks || []).map((candle) => {
        const color = isMainSeriesCandlesticks
          ? darken(convertCandleToColor(candle))
          : colors.neutral[600]

        return {
          time: candle.time,
          value: (volumeInDollars ? candle.close : 1) * candle.volume,
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

    return {
      lowerOpacity: false,
    }
  }
