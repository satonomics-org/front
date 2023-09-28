import {
  chartState,
  colors,
  createAutoscaleInfoProvider,
  createCandlesticksSeries,
  createLineSeries,
  createPriceLine,
  setMinMaxMarkers,
  setTimeScale,
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
  datasets: Datasets,
  options?: PriceSeriesOptions,
) => {
  if (!chart) return

  const seriesType =
    chartState.seriesType || checkIfUpClose(chart, chartState.range)

  chartState.seriesType = seriesType

  const lowerOpacity =
    options?.lowerOpacity ??
    options?.halved ??
    chart.priceScale('left').options().visible

  const priceMode = options?.priceMode
  const candlesticks = (
    priceMode === 'sats'
      ? datasets.satsPrice
      : priceMode === 'gold'
      ? datasets.goldPerBitcoin
      : datasets.candlesticks
  ).values

  if (seriesType === 'Candlestick') {
    const series = createCandlesticksSeries(chart, {
      inverseColors: priceMode === 'sats',
      lowerOpacity,
      ...options?.seriesOptions,
    })

    createEffect(() => series.setData(candlesticks() || []))

    chartState.priceSeries = series
  } else {
    const series = createLineSeries(chart, {
      color: lowerOpacity ? colors.offWhite() : colors.white(),
      autoscaleInfoProvider: createAutoscaleInfoProvider(true),
      ...options?.seriesOptions,
    })

    createEffect(() =>
      series.setData(
        (priceMode === 'sats'
          ? datasets.satsPriceCloses
          : priceMode === 'gold'
          ? datasets.goldPerBitcoinCloses
          : datasets.closes
        ).values() || [],
      ),
    )

    chartState.priceSeries = series
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

  const series = chartState.priceSeries

  chartState.priceLine = createPriceLine(series)

  setMinMaxMarkers(chart, series, candlesticks() || [], chartState.range)

  setTimeScale(chart, series, candlesticks() || [])
}
