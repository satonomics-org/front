import { LineStyle } from 'lightweight-charts'

import {
  convertCandleToColor,
  createCandlesticksSeries,
  createLineSeries,
  dateToString,
  presetsGroups,
  setMinMaxMarkers,
} from '/src/scripts'

const state = {
  candlestickSeries: undefined as ISeriesApi<'Candlestick'> | undefined,
  chart: null as IChartApi | null,
  priceLine: undefined as IPriceLine | undefined,
  range: null as LogicalRange | null,
}

const phantomDataset: WhitespaceData[] = []

const setPhantomDataset = () => {
  const date = new Date(
    (phantomDataset.at(-1)?.time as string | undefined) || '2009-01-02',
  )

  const todayValueOf = new Date().valueOf()

  const tickDate = () => date.setUTCDate(date.getUTCDate() + 1)

  tickDate()

  while (date.valueOf() <= todayValueOf) {
    phantomDataset.push({ time: dateToString(date) })

    tickDate()
  }
}

setPhantomDataset()

export const updatePriceLine = (last?: CandlestickDataWithVolume) => {
  if (!last || !state.chart) return

  try {
    state.candlestickSeries?.update({ ...last })

    state.priceLine?.applyOptions({
      price: last.close,
      color: convertCandleToColor(last),
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

  const { chart } = state

  try {
    const phantom = createLineSeries(chart)

    setPhantomDataset()

    phantom.setData(phantomDataset.map((data) => ({ ...data })))

    applyPreset?.({
      chart,
      datasets,
    })

    applyPriceCandlesticksSeries(chart, candlesticks)

    if (state.range) {
      chart.timeScale().setVisibleLogicalRange(state.range)
    }

    chart
      .timeScale()
      .subscribeVisibleLogicalRangeChange((_range) => (state.range = _range))
  } catch {}
}

export const cleanChart = () => {
  state.priceLine = undefined
  state.candlestickSeries = undefined

  try {
    state.chart?.remove()
  } catch {}

  state.chart = null
}

const applyPriceCandlesticksSeries = (
  chart: IChartApi,
  candlesticks: CandlestickDataWithVolume[],
  inverseColors?: boolean,
) => {
  state.candlestickSeries = createCandlesticksSeries(chart, inverseColors)

  state.candlestickSeries.setData(
    candlesticks.map((data) => ({
      ...data,
    })),
  )

  const priceLineOptions: PriceLineOptions = {
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
