import { PriceScaleMode } from 'lightweight-charts'

import { createHistogramSeries, resetLeftPriceScale } from '/src/scripts'

const percentageAutoscaleInfoProvider: AutoscaleInfoProvider = () => ({
  priceRange: {
    minValue: 0.01,
    maxValue: 1_000_000,
  },
})

export const generateApplyPreset =
  (key: '30DBalanceChanges' | '90DBalanceChanges'): ApplyPreset =>
  ({ chart, datasets }) => {
    resetLeftPriceScale(chart, {
      halved: true,
      mode: PriceScaleMode.Logarithmic,
      scaleMargins: {
        bottom: 0,
      },
    })
    ;[
      {
        dataset: datasets[key].humpbacks,
        title: 'Humpbacks',
      },
      {
        dataset: datasets[key].whales,
        title: 'Whales',
      },
      {
        dataset: datasets[key].sharks,
        title: 'Sharks',
      },
      {
        dataset: datasets[key].fish,
        title: 'Fish',
      },
      {
        dataset: datasets[key].crabs,
        title: 'Crabs',
      },
      {
        dataset: datasets[key].shrimps,
        title: 'Shrimps',
      },
      {
        dataset: datasets[key].plankton,
        title: 'Plankton',
      },
    ].map(({ dataset, title }) => {
      const series = createHistogramSeries(chart, {
        title,
        priceScaleId: 'left',
        autoscaleInfoProvider: percentageAutoscaleInfoProvider,
      })

      createEffect(() => series.setData(dataset.values() || []))
    })

    return {
      halved: true,
    }
  }
