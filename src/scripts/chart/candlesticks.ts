import { colors, createAutoscaleInfoProvider } from '/src/scripts'

export const createCandlesticksSeries = (
  chart: LightweightCharts.IChartApi,
  inverseColors: boolean = false
) => {
  const upColor = inverseColors ? colors.red : colors.green
  const downColor = inverseColors ? colors.green : colors.red

  const candlestickSeries = chart.addCandlestickSeries({
    upColor,
    wickUpColor: upColor,
    downColor,
    wickDownColor: downColor,
    borderVisible: false,
    priceLineVisible: false,
    lastValueVisible: false,
    autoscaleInfoProvider: createAutoscaleInfoProvider(true),
  })

  return candlestickSeries
}
