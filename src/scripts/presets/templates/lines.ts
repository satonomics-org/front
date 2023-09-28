import { createLineSeries, resetLeftPriceScale } from '/src/scripts'

export const applyDifferentLinesPreset = ({
  chart,
  list,
  priceScaleOptions,
}: {
  chart: IChartApi
  priceScaleOptions?: FullPriceScaleOptions
  list: {
    dataset: Dataset
    color: string
    title?: string
  }[]
}) => {
  const { halved } = priceScaleOptions || {}

  resetLeftPriceScale(chart, {
    visible: halved,
    ...priceScaleOptions,
  })

  list.forEach(({ dataset, color, title }) => {
    const series = createLineSeries(chart, {
      color,
      title,
      ...(halved
        ? {
            priceScaleId: 'left',
          }
        : {
            autoscaleInfoProvider: undefined,
          }),
    })

    createEffect(() => series.setData(dataset?.values() || []))
  })

  return {
    halved,
  }
}
