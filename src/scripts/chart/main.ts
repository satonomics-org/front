import { LineStyle } from 'lightweight-charts'

import {
  createCandlesticksSeries,
  getCandleToColor,
  presetsGroups,
  setMinMaxMarkers,
} from '/src/scripts'

const state = {
  abortController: undefined as AbortController | undefined,
  candlestickSeries: undefined as
    | LightweightCharts.ISeriesApi<'Candlestick'>
    | undefined,
  chart: null as LightweightCharts.IChartApi | null,
  priceLine: undefined as LightweightCharts.IPriceLine | undefined,
  range: null as LightweightCharts.LogicalRange | null,
}

export const updatePriceLine = (last: CandlestickDataWithVolume | null) => {
  if (!last || !state.chart) return

  try {
    state.candlestickSeries?.update({ ...last })

    state.priceLine?.applyOptions({
      price: last.close,
      color: getCandleToColor(last),
    })
  } catch {}
}

export const selectPreset = async (
  candlesticks: CandlesticksProp,
  resetChart: ChartResetter | undefined,
  id: string,
  datasets: DatasetsResources
) => {
  const applyPreset = presetsGroups
    .map((group) => group.list)
    .flat()
    .find((preset) => preset.id === id)?.apply

  cleanChart()

  const { list: candlesticksList } = candlesticks

  state.chart = resetChart?.() || null

  if (!state.chart || !candlesticksList.length) return

  state.abortController = new AbortController()

  try {
    applyPreset?.({
      chart: state.chart,
      signal: state.abortController.signal,
      candlesticks: candlesticksList,
      datasets,
    })

    applyPriceCandlesticksSeries(state.chart, candlesticks)

    if (state.range) {
      state.chart.timeScale().setVisibleLogicalRange(state.range)
    }

    state.chart
      .timeScale()
      .subscribeVisibleLogicalRangeChange((_range) => (state.range = _range))
  } catch {}
}

export const cleanChart = () => {
  state.abortController?.abort()

  state.priceLine = undefined
  state.candlestickSeries = undefined

  try {
    state.chart?.remove()
  } catch {}

  state.chart = null
}

const applyPriceCandlesticksSeries = (
  chart: LightweightCharts.IChartApi,
  candlesticks: CandlesticksProp,
  inverseColors?: boolean
) => {
  const { last, list } = candlesticks

  if (!list.length) return

  state.candlestickSeries = createCandlesticksSeries(chart, inverseColors)

  state.candlestickSeries.setData(
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

  state.priceLine = state.candlestickSeries.createPriceLine(priceLineOptions)

  setMinMaxMarkers(chart, state.candlestickSeries, list)

  last && updatePriceLine(last)
}
