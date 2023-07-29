type CandlesticksProp = {
  list: CandlestickDataWithVolume[]
  last: CandlestickDataWithVolume | null
}

type ApplyPreset = (params: {
  chart: LightweightCharts.IChartApi
  datasets: DatasetsResources
  signal?: AbortSignal
  candlesticks?: CandlestickDataWithVolume[]
}) => LightweightCharts.ISeriesApi<any>[]

type ChartResetter = (() => LightweightCharts.IChartApi | null) | null
