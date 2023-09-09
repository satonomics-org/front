import { applyDifferentLinesPreset, colors } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  applyDifferentLinesPreset({
    chart,
    list: [
      {
        dataset: datasets.realizedPrice,
        color: colors.realizedPrice,
        title: 'All',
      },
      {
        dataset: datasets.lthRealizedPrice,
        color: colors.lth,
        title: 'LTH',
      },
      {
        dataset: datasets.twoYearsRealizedPrice,
        color: colors.twoYearsHolders,
        title: '<2Y',
      },
      {
        dataset: datasets.oneYearRealizedPrice,
        color: colors.oneYearHolders,
        title: '<1Y',
      },
      {
        dataset: datasets.sixMonthsRealizedPrice,
        color: colors.sixMonthsHolder,
        title: '<6M',
      },
      {
        dataset: datasets.sthRealizedPrice,
        color: colors.sth,
        title: 'STH',
      },
      {
        dataset: datasets.threeMonthsRealizedPrice,
        color: colors.threeMonthsHolders,
        title: '<3M',
      },
      {
        dataset: datasets.oneMonthRealizedPrice,
        color: colors.oneMonthHolders,
        title: '<1M',
      },
    ],
  })
}
