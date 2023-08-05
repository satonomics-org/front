import {
  assignedColors,
  createLineSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)
  ;[
    {
      dataset: datasets.terminalPrice,
      color: assignedColors.terminal,
      title: 'Terminal',
      autoscale: false,
    },
    {
      dataset: datasets.cvdd,
      color: assignedColors.cvdd,
      title: 'CVDD',
      autoscale: false,
    },
    {
      dataset: datasets.balancedPrice,
      color: assignedColors.balanced,
      title: 'Balanced',
      autoscale: false,
    },
    {
      dataset: datasets.realizedPrice,
      color: assignedColors.realized,
      title: 'Realized',
      autoscale: false,
    },
  ].map(({ dataset, color, autoscale, title }) => {
    const series = createLineSeries({
      chart,
      color,
      autoscale,
      title,
    })

    dataset.fetch()

    createEffect(() => {
      series.setData((dataset.values() || []).map((data) => ({ ...data })))
    })
  })
}
