import { LineStyle } from 'lightweight-charts'

import { colors, getCandleToColor, seriesGroups } from '/src/scripts'

import { createAutoscaleInfoProvider } from './autoScale'
import { setMinMaxMarkers } from './markers'

let abortController: AbortController | undefined
let candlestickSeries: LightweightCharts.ISeriesApi<'Candlestick'> | undefined
let priceLine: LightweightCharts.IPriceLine | undefined
let chart: LightweightCharts.IChartApi | null = null
let range: LightweightCharts.LogicalRange | null = null

export const updatePriceLine = (last: CandlestickDataWithVolume | null) => {
  if (!last || !chart) return

  try {
    candlestickSeries?.update({ ...last })

    priceLine?.applyOptions({
      price: last.close,
      color: getCandleToColor(last),
    })
  } catch {}
}

export const selectSeries = async (
  candlesticks: CandlesticksProp,
  resetChart: ChartResetter | undefined,
  id: string
) => {
  const createSeries = seriesGroups
    .map((group) => group.list)
    .flat()
    .find((series) => series.id === id)?.creator

  cleanChart()

  const { list } = candlesticks

  chart = resetChart?.() || null

  if (!chart || !list.length) return

  abortController = new AbortController()

  try {
    await createSeries?.(chart, abortController.signal, list)

    createCandlesticksSeries(chart, candlesticks)

    if (range) {
      chart.timeScale().setVisibleLogicalRange(range)
    }

    chart
      .timeScale()
      .subscribeVisibleLogicalRangeChange((_range) => (range = _range))
  } catch {}
}

export const cleanChart = () => {
  abortController?.abort()

  priceLine = undefined
  candlestickSeries = undefined

  try {
    chart?.remove()
  } catch {}

  chart = null
}

const createCandlesticksSeries = (
  chart: LightweightCharts.IChartApi,
  candlesticks: CandlesticksProp
) => {
  const { last, list } = candlesticks

  if (!chart || !list.length) return

  candlestickSeries = chart.addCandlestickSeries({
    upColor: colors.green,
    downColor: colors.red,
    wickUpColor: colors.green,
    wickDownColor: colors.red,
    borderVisible: false,
    priceLineVisible: false,
    lastValueVisible: false,
    autoscaleInfoProvider: createAutoscaleInfoProvider(true),
  })

  candlestickSeries.setData(
    list.map((data) => ({
      ...data,
    }))
  )

  const priceLineOptions: LightweightCharts.PriceLineOptions = {
    price: 0,
    color: 'transparent',
    lineVisible: true,
    lineWidth: 1,
    lineStyle: LineStyle.SparseDotted,
    axisLabelVisible: true,
    title: '',
    axisLabelColor: '',
    axisLabelTextColor: '',
  }

  priceLine = candlestickSeries.createPriceLine(priceLineOptions)

  setMinMaxMarkers(chart, candlestickSeries, list)

  last && updatePriceLine(last)
}
