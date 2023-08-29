import { colors, createAutoscaleInfoProvider } from '/src/scripts'

export const createCandlesticksSeries = (
  chart: IChartApi,
  inverseColors: boolean = false,
) => {
  const leftPriceScaleVisible = chart.priceScale('left').options().visible

  const setOpacity = (color: string) =>
    leftPriceScaleVisible ? `${color}88` : color

  const upColor = setOpacity(inverseColors ? colors.down : colors.up)
  const downColor = setOpacity(inverseColors ? colors.up : colors.down)

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
): SingleValueData[] =>
  (candlesticks || []).map(({ time, close }) => ({
    time,
    value: close,
  }))
