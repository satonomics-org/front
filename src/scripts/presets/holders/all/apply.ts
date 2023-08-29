import { applyDifferentLinesPreset, colors } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  applyDifferentLinesPreset({
    chart,
    list: [
      {
        dataset: datasets.realizedPrice,
        color: colors.realized,
        title: 'All',
      },
      {
        dataset: datasets.lthRealizedPrice,
        color: colors.lth,
        title: 'LTH',
      },
      {
        dataset: datasets.twoYearsRealizedPrice,
        color: colors.twoYears,
        title: '<2Y',
      },
      {
        dataset: datasets.oneYearRealizedPrice,
        color: colors.oneYear,
        title: '<1Y',
      },
      {
        dataset: datasets.sixMonthsRealizedPrice,
        color: colors.sixMonths,
        title: '<6M',
      },
      {
        dataset: datasets.sthRealizedPrice,
        color: colors.sth,
        title: 'STH',
      },
      {
        dataset: datasets.threeMonthsRealizedPrice,
        color: colors.threeMonths,
        title: '<3M',
      },
      {
        dataset: datasets.oneMonthRealizedPrice,
        color: colors.oneMonth,
        title: '<1M',
      },
    ],
  })
}
