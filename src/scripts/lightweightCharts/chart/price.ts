import {
  chartState,
  colors,
  createCandlesticksSeries,
  createLineSeries,
  createPriceLine,
  debounce,
  setMinMaxMarkers,
  updateLastCandlestick,
} from '/src/scripts'

const checkIfUpClose = (chart: IChartApi, range?: LogicalRange | null) => {
  const from = range?.from || 0
  const to = range?.to || 0
  const width = chart.timeScale().width()

  const difference = to - from

  return width / difference >= 2 ? 'Candlestick' : 'Line'
}

export const applyPriceSeries = (
  chart: IChartApi,
  candlesticks: CandlestickDataWithVolume[],
  options?: PriceSeriesOptions,
) => {
  if (!chart) return

  const seriesType =
    chartState.seriesType || checkIfUpClose(chart, chartState.range)

  chartState.seriesType = seriesType

  const lowerOpacity =
    options?.lowerOpacity ?? chart.priceScale('left').options().visible

  if (seriesType === 'Candlestick') {
    chartState.priceSeries = createCandlesticksSeries(chart, {
      inverseColors: false,
      lowerOpacity,
      ...options?.seriesOptions,
    })
  } else {
    chartState.priceSeries = createLineSeries(chart, {
      color: lowerOpacity ? colors.offWhite() : colors.white(),
      autoscaleInfoProvider: undefined,
      priceLineStyle: undefined,
      ...options?.seriesOptions,
    })
  }

  chartState.priceSeries.priceScale().applyOptions({
    ...(options?.halved
      ? {
          scaleMargins: {
            top: 0.1,
            bottom: 0.45,
          },
        }
      : {}),
    ...options?.priceScaleOptions,
  })

  finalizePriceSeries(chart, chartState.priceSeries, candlesticks)
}

const finalizePriceSeries = (
  chart: IChartApi,
  series: ISeriesApi<'Line' | 'Candlestick'>,
  candlesticks: CandlestickDataWithVolume[],
) => {
  series.setData(
    candlesticks.map((data) => ({
      ...data,
      value: data.close,
    })),
  )

  if (chartState.range) {
    chart.timeScale().setVisibleLogicalRange(chartState.range)
  }

  chartState.priceLine = createPriceLine(series)

  updateLastCandlestick(candlesticks.at(-1))

  setMinMaxMarkers(chart, series, candlesticks, chartState.range)

  const debouncedCallback = debounce((range: LogicalRange | null) => {
    range = range || chartState.range
    chartState.range = range

    try {
      const seriesType = checkIfUpClose(chart, range)
      chartState.seriesType = seriesType

      if (
        (seriesType === 'Candlestick' && series.seriesType() === 'Line') ||
        (seriesType === 'Line' && series.seriesType() === 'Candlestick')
      ) {
        chart
          .timeScale()
          .unsubscribeVisibleLogicalRangeChange(debouncedCallback)

        chartState.reset?.()
      } else {
        setMinMaxMarkers(chart, series, candlesticks, range)
      }
    } catch {}
  }, 250)

  chart.timeScale().subscribeVisibleLogicalRangeChange(debouncedCallback)
}
