export const chartState = {
  chart: null as IChartApi | null,
  priceSeries: null as ISeriesApi<'Candlestick' | 'Line'> | null,
  priceLine: null as IPriceLine | null,
  seriesType: null as 'Candlestick' | 'Line' | null,
  range: null as LogicalRange | null,
  reset: null as (() => void) | null,
}
