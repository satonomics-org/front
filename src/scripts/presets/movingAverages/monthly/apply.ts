import {
  applyQuantilesPreset,
  computeMonthlyMovingAverage,
  convertCandlesticksToSingleValueDataset,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, candlesticks }) => {
  applyQuantilesPreset({
    chart,
    dataset: computeMonthlyMovingAverage(
      convertCandlesticksToSingleValueDataset(candlesticks),
    ),
    candlesticks,
  })
}
