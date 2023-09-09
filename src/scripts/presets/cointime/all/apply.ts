import { colors, createLineSeries, resetLeftPriceScale } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)
  ;[
    {
      dataset: datasets.vaultedPrice,
      color: colors.vaultedPrice,
      title: 'Vaulted',
    },
    {
      dataset: datasets.cointimePrice,
      color: colors.cointimePrice,
      title: 'Cointime',
    },
    {
      dataset: datasets.trueMeanPrice,
      color: colors.trueMeanPrice,
      title: 'True Mean',
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
