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
  (key: 'volumeInBitcoin' | 'volumeInDollars'): ApplyPreset =>
  ({ chart, datasets }) => {
    resetLeftPriceScale(chart, {
      visible: true,
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    })

    const volume = createHistogramSeries(chart)

    const ma = createLineSeries(chart, {
      priceScaleId: 'left',
    })

    createEffect(() => {
      const isMainSeriesCandlesticks = chartState.seriesType !== 'Line'

      ma.applyOptions({
        color: isMainSeriesCandlesticks
          ? colors.yellow[500]
          : colors.neutral[200],
      })

      volume.setData(
        (datasets[key].values() || []).map((value) => ({
          ...value,
          color: isMainSeriesCandlesticks ? value.color : colors.neutral[600],
        })),
      )

      ma.setData(datasets[key].averages.monthly())
    })

    return {
      lowerOpacity: false,
    }
  }
