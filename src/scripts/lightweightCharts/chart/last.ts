import {
  chartState,
  colors,
  convertCandleToColor,
  convertNormalCandleToGoldPerBitcoinCandle,
  convertNormalCandleToSatCandle,
} from '/src/scripts'

export const updateLastCandlestick = (
  candlestick: DatedCandlestickData | null,
  datasets: Datasets,
  options?: PriceSeriesOptions,
) => {
  if (!candlestick || !chartState.chart) return

  const isInGoldMode = options?.priceMode === 'gold'
  const isInSatsMode = options?.priceMode === 'sats'

  try {
    const copied = {
      ...(isInSatsMode
        ? convertNormalCandleToSatCandle(candlestick)
        : isInGoldMode
        ? convertNormalCandleToGoldPerBitcoinCandle(
            candlestick,
            datasets.goldPrice.values()?.at(-1)?.value,
          )
        : candlestick),
      value: 0,
    }
    copied.value = copied.close

    chartState.priceSeries?.update(copied)

    chartState.priceLine?.applyOptions({
      price: copied.value,
      color:
        chartState.priceSeries?.seriesType() === 'Candlestick'
          ? convertCandleToColor(copied, isInSatsMode)
          : colors.white(),
    })
  } catch {}
}
