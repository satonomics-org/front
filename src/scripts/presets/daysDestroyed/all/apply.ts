import { colors, createLineSeries, resetLeftPriceScale } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)
  ;[
    {
      dataset: datasets.terminalPrice,
      color: colors.terminalPrice,
      title: 'Terminal',
    },
    {
      dataset: datasets.cvdd,
      color: colors.cvdd,
      title: 'CVDD',
    },
    {
      dataset: datasets.balancedPrice,
      color: colors.balancedPrice,
      title: 'Balanced',
    },
    {
      dataset: datasets.realizedPrice,
      color: colors.realizedPrice,
      title: 'Realized',
    },
  ].map(({ dataset, color, title }) => {
    const series = createLineSeries(chart, {
      color,
      autoscaleInfoProvider: undefined,
      title,
    })

    dataset.fetch()

    createEffect(() => {
      series.setData((dataset.values() || []).map((data) => ({ ...data })))
    })
  })
}
