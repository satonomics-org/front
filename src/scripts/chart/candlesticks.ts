import { colors, createAutoscaleInfoProvider } from '/src/scripts'

export const createCandlesticksSeries = (
  chart: LightweightCharts.IChartApi,
  inverseColors: boolean = false,
) => {
  const leftPriceScaleVisible = chart.priceScale('left').options().visible

  const setOpacity = (color: string) =>
    leftPriceScaleVisible ? `${color}88` : color

  const upColor = setOpacity(inverseColors ? colors.red : colors.green)
  const downColor = setOpacity(inverseColors ? colors.green : colors.red)

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

export const convertCandlesticksToSingleValueDataset = (
  candlesticks?: CandlestickDataWithVolume[] | null,
): LightweightCharts.SingleValueData[] =>
  (candlesticks || []).map(({ time, close }) => ({
    time,
    value: close,
  }))
