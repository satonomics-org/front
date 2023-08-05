type CandlesticksProp = {
  list: CandlestickDataWithVolume[]
  last: CandlestickDataWithVolume | null
}

type ApplyPreset = (params: {
  chart: LightweightCharts.IChartApi
  datasets: DatasetsResources
  signal?: AbortSignal
  candlesticks?: CandlestickDataWithVolume[]
}) => void

type ChartResetter = (() => LightweightCharts.IChartApi | null) | null
