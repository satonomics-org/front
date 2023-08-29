import { colors, createLineSeries, resetLeftPriceScale } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)
  ;[
    {
      dataset: datasets.terminalPrice,
      color: colors.terminal,
      title: 'Terminal',
      autoscale: undefined,
    },
    {
      dataset: datasets.cvdd,
      color: colors.cvdd,
      title: 'CVDD',
      autoscale: undefined,
    },
    {
      dataset: datasets.balancedPrice,
      color: colors.balanced,
      title: 'Balanced',
      autoscale: undefined,
    },
    {
      dataset: datasets.realizedPrice,
      color: colors.realized,
      title: 'Realized',
      autoscale: undefined,
    },
  ].map(({ dataset, color, autoscale, title }) => {
    const series = createLineSeries(chart, {
      color,
      autoscaleInfoProvider: autoscale,
      title,
    })

    dataset.fetch()

    createEffect(() => {
      series.setData((dataset.values() || []).map((data) => ({ ...data })))
    })
  })
}
