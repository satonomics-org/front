import { getOwner, runWithOwner } from 'solid-js'

import {
  applyPriceSeries,
  chartState,
  createChart,
  createLineSeries,
  presetsGroups,
  updateWhitespaceDataset,
} from '/src/scripts'

const whitespaceDataset: WhitespaceData[] = []

updateWhitespaceDataset(whitespaceDataset)

export const renderChart = async (params: {
  candlesticks: CandlestickDataWithVolume[]
  id: string
  datasets: Datasets
}) => {
  const owner = getOwner()

  chartState.reset = () => runWithOwner(owner, () => renderChart(params))

  const { candlesticks, id, datasets } = params

  console.log(`preset: ${id}`)

  createChart()

  const { chart } = chartState

  if (!chart || !candlesticks.length) return

  try {
    const whitespaceSeries = createLineSeries(chart)

    updateWhitespaceDataset(whitespaceDataset)

    whitespaceSeries.setData(whitespaceDataset.map((data) => ({ ...data })))

    const options =
      presetsGroups
        .map((group) => group.list)
        .flat()
        .find((preset) => preset.id === id)
        ?.applyPreset?.({
          chart,
          datasets,
        }) || undefined

    applyPriceSeries(chart, candlesticks, options)
  } catch {}
}
