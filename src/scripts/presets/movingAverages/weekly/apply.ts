import {
  applyQuantilesPreset,
  computeWeeklyMovingAverage,
  convertCandlesticksToSingleValueDataset,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, candlesticks }) => {
  applyQuantilesPreset({
    chart,
    dataset: computeWeeklyMovingAverage(
      convertCandlesticksToSingleValueDataset(candlesticks),
    ),
    candlesticks,
  })
}
