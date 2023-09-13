import { chartState, colors, convertCandleToColor } from '/src/scripts'

export const updateLastCandlestick = (
  candlestick?: CandlestickDataWithVolume | null,
) => {
  if (!candlestick || !chartState.chart) return

  try {
    chartState.priceSeries?.update({ ...candlestick, value: candlestick.close })

    chartState.priceLine?.applyOptions({
      price: candlestick.close,
      color:
        chartState.priceSeries?.seriesType() === 'Candlestick'
          ? convertCandleToColor(candlestick)
          : colors.white(),
    })
  } catch {}
}
