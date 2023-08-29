import { applyDifferentLinesPreset, colors } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  applyDifferentLinesPreset({
    chart,
    list: [
      {
        dataset: datasets.yearlyMA,
        color: colors.white,
        title: 'Yearly',
      },
      {
        dataset: datasets.monthlyMA,
        color: colors.yellow[500],
        title: 'Monthly',
      },
      {
        dataset: datasets.weeklyMA,
        color: colors.orange[500],
        title: 'Weekly',
      },
    ],
  })
}
