type CandlesticksProp = {
  list: CandlestickDataWithVolume[]
  last: CandlestickDataWithVolume | null
}

type CreateSeries = (
  chart: LightweightCharts.IChartApi,
  signal: AbortSignal,
  candlesticks?: CandlestickDataWithVolume[]
) => Promise<LightweightCharts.ISeriesApi<any>[]>
