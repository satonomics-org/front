import { applyDifferentLinesPreset, colors } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  applyDifferentLinesPreset({
    chart,
    list: [
      {
        dataset: datasets.yearlyMA,
        color: colors.yearlyMA,
        title: 'Yearly',
      },
      {
        dataset: datasets.monthlyMA,
        color: colors.monthlyMA,
        title: 'Monthly',
      },
      {
        dataset: datasets.weeklyMA,
        color: colors.weeklyMA,
        title: 'Weekly',
      },
    ],
  })
}
