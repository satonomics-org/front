import { makeTimer } from '@solid-primitives/timer'

import { chartState, debounce, setMinMaxMarkers } from '/src/scripts'

export const setTimeScale = (
  chart: IChartApi,
  series: ISeriesApi<'Line' | 'Candlestick'>,
  candlesticks: CandlestickDataWithVolume[],
) => {
  const debouncedCallback = debounce((range: LogicalRange | null) => {
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

  makeTimer(
    () =>
      chart
        .timeScale()
        .subscribeVisibleLogicalRangeChange((range: LogicalRange | null) => {
          range = range || chartState.range
          chartState.range = range
          localStorage.setItem('range', JSON.stringify(range))
        }),
    500,
    setTimeout,
  )

  if (chartState.range) {
    chart.timeScale().setVisibleLogicalRange(chartState.range)
  }
}

export const checkIfUpClose = (
  chart: IChartApi,
  range?: LogicalRange | null,
) => {
  const from = range?.from || 0
  const to = range?.to || 0
  const width = chart.timeScale().width()

  const difference = to - from

  return width / difference >= 2 ? 'Candlestick' : 'Line'
}
