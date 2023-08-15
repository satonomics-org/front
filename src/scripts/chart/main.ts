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

export const updatePriceLine = (last?: CandlestickDataWithVolume) => {
  if (!last || !state.chart) return

  try {
    state.candlestickSeries?.update({ ...last })

    state.priceLine?.applyOptions({
      price: last.close,
      color: getCandleToColor(last),
    })
  } catch {}
}

export const selectPreset = async (params: {
  candlesticks: CandlestickDataWithVolume[]
  resetChart: ChartResetter | undefined
  id: string
  datasets: Datasets
}) => {
  const { candlesticks, resetChart, id, datasets } = params

  console.log(`preset: ${id}`)

  const applyPreset = presetsGroups
    .map((group) => group.list)
    .flat()
    .find((preset) => preset.id === id)?.applyPreset

  cleanChart()

  state.chart = resetChart?.() || null

  if (!state.chart || !candlesticks.length) return

  state.abortController = new AbortController()

  try {
    applyPreset?.({
      chart: state.chart,
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
  candlesticks: CandlestickDataWithVolume[],
  inverseColors?: boolean,
) => {
  state.candlestickSeries = createCandlesticksSeries(chart, inverseColors)

  state.candlestickSeries.setData(
    candlesticks.map((data) => ({
      ...data,
    })),
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

  setMinMaxMarkers(chart, state.candlestickSeries, candlesticks)

  updatePriceLine(candlesticks.at(-1))
}
