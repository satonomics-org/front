import { applyQuantilesPreset, assignedColors } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets, candlesticks }) => {
  applyQuantilesPreset({
    chart,
    datasetResource: datasets.sixMonthsRealizedPrice,
    color: assignedColors.sixMonths,
    candlesticks,
  })
}
