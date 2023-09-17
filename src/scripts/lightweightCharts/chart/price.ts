import { makeTimer } from '@solid-primitives/timer'

import {
  chartState,
  colors,
  createAutoscaleInfoProvider,
  createCandlesticksSeries,
  createLineSeries,
  createPriceLine,
  setMinMaxMarkers,
  setTimeScale,
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

  if (seriesType === 'Candlestick') {
    const series = createCandlesticksSeries(chart, {
      inverseColors: false,
      lowerOpacity,
      ...options?.seriesOptions,
    })

    series.setData(datasets.candlesticks.values() || [])

    chartState.priceSeries = series
  } else {
    const series = createLineSeries(chart, {
      color: lowerOpacity ? colors.offWhite() : colors.white(),
      autoscaleInfoProvider: createAutoscaleInfoProvider(true),
      ...options?.seriesOptions,
    })

    series.setData(datasets.closes.values() || [])

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

  finalizePriceSeries(
    chart,
    chartState.priceSeries,
    datasets.candlesticks.values() || [],
  )
}

const finalizePriceSeries = (
  chart: IChartApi,
  series: ISeriesApi<'Line' | 'Candlestick'>,
  candlesticks: CandlestickDataWithVolume[],
) => {
  chartState.priceLine = createPriceLine(series)

  updateLastCandlestick(candlesticks.at(-1))

  setMinMaxMarkers(chart, series, candlesticks, chartState.range)

  setTimeScale(chart, series, candlesticks)
}
