import { applyDifferentLinesPreset, assignedColors } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  applyDifferentLinesPreset({
    chart,
    list: [
      {
        dataset: datasets.realizedPrice,
        color: assignedColors.realized,
        title: 'All',
      },
      {
        dataset: datasets.lthRealizedPrice,
        color: assignedColors.lth,
        title: 'LTH',
      },
      {
        dataset: datasets.twoYearsRealizedPrice,
        color: assignedColors.twoYears,
        title: '<2Y',
      },
      {
        dataset: datasets.oneYearRealizedPrice,
        color: assignedColors.oneYear,
        title: '<1Y',
      },
      {
        dataset: datasets.sthRealizedPrice,
        color: assignedColors.sth,
        title: 'STH',
      },
      {
        dataset: datasets.threeMonthsRealizedPrice,
        color: assignedColors.threeMonths,
        title: '<3M',
      },
      {
        dataset: datasets.oneMonthRealizedPrice,
        color: assignedColors.oneMonth,
        title: '<1M',
      },
    ],
  })
}
