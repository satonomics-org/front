import { applyDifferentLinesPreset, assignedColors } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  applyDifferentLinesPreset({
    chart,
    list: [
      {
        datasetResource: datasets.realizedPrice,
        color: assignedColors.realized,
        title: 'All',
      },
      {
        datasetResource: datasets.lthRealizedPrice,
        color: assignedColors.lth,
        title: 'LTH',
      },
      {
        datasetResource: datasets.twoYearsRealizedPrice,
        color: assignedColors.twoYears,
        title: '<2Y',
      },
      {
        datasetResource: datasets.oneYearRealizedPrice,
        color: assignedColors.oneYear,
        title: '<1Y',
      },
      {
        datasetResource: datasets.sixMonthsRealizedPrice,
        color: assignedColors.sixMonths,
        title: '<6M',
      },
      {
        datasetResource: datasets.sthRealizedPrice,
        color: assignedColors.sth,
        title: 'STH',
      },
      {
        datasetResource: datasets.threeMonthsRealizedPrice,
        color: assignedColors.threeMonths,
        title: '<3M',
      },
      {
        datasetResource: datasets.oneMonthRealizedPrice,
        color: assignedColors.oneMonth,
        title: '<1M',
      },
    ],
  })
}
