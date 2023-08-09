import {
  applyDifferentLinesPreset,
  assignedColors,
  colors,
  computeMonthlyMovingAverage,
  computeWeeklyMovingAverage,
  computeYearlyMovingAverage,
  convertCandlesticksToSingleValueDataset,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, candlesticks }) => {
  applyDifferentLinesPreset({
    chart,
    list: [
      {
        dataset: computeYearlyMovingAverage(
          convertCandlesticksToSingleValueDataset(candlesticks),
        ),
        color: colors.white,
        title: 'Yearly',
      },
      {
        dataset: computeMonthlyMovingAverage(
          convertCandlesticksToSingleValueDataset(candlesticks),
        ),
        color: colors.yellow,
        title: 'Monthly',
      },
      {
        dataset: computeWeeklyMovingAverage(
          convertCandlesticksToSingleValueDataset(candlesticks),
        ),
        color: colors.orange,
        title: 'Weekly',
      },
    ],
  })
}
