import {
  applyQuantilesPreset,
  computeYearlyMovingAverage,
  convertCandlesticksToSingleValueDataset,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, candlesticks }) => {
  applyQuantilesPreset({
    chart,
    dataset: computeYearlyMovingAverage(
      convertCandlesticksToSingleValueDataset(candlesticks),
    ),
    candlesticks,
  })
}
