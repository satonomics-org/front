import { colors, createAutoscaleInfoProvider, darken } from '/src/scripts'

export const createCandlesticksSeries = (
  chart: IChartApi,
  options: PriceSeriesOptions,
) => {
  const { inverseColors, lowerOpacity } = options

  const setOpacity = (color: string) =>
    lowerOpacity ? darken(color, 0.4) : color

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
): DatedSingleValueData[] =>
  (candlesticks || []).map(({ date, time, close }) => ({
    date,
    time,
    value: close,
  }))
