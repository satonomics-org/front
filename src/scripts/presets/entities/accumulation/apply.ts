import { PriceScaleMode } from 'lightweight-charts'

import {
  colors,
  createHistogramSeries,
  resetLeftPriceScale,
  stepColors,
} from '/src/scripts'

const percentageAutoscaleInfoProvider: AutoscaleInfoProvider = () => ({
  priceRange: {
    minValue: 0.01,
    maxValue: 1_000_000,
  },
})

export const generateApplyPreset =
  (offset: number): ApplyPreset =>
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
        dataset: datasets.humpbacksDistribution,
        title: 'Humpbacks',
        size: 100_000,
      },
      {
        dataset: datasets.whalesDistribution,
        title: 'Whales',
        size: 10_000,
      },
      {
        dataset: datasets.sharksDistribution,
        title: 'Sharks',
        size: 1000,
      },
      {
        dataset: datasets.fishDistribution,
        title: 'Fish',
        size: 100,
      },
      {
        dataset: datasets.crabsDistribution,
        title: 'Crabs',
        size: 10,
      },
      {
        dataset: datasets.shrimpsDistribution,
        title: 'Shrimps',
        size: 1,
      },
      {
        dataset: datasets.planktonDistribution,
        title: 'Plankton',
        size: 0.1,
      },
    ].map(({ dataset, title, size }) => {
      const series = createHistogramSeries(chart, {
        title,
        priceScaleId: 'left',
        autoscaleInfoProvider: percentageAutoscaleInfoProvider,
      })

      dataset.fetch()

      createEffect(() => {
        const values = dataset.values() || []

        const ups = stepColors(colors.black, colors.up, 12)
        const downs = stepColors(colors.black, colors.down, 12)

        const getColor = (value: number) =>
          [
            { color: downs[11], range: [-Infinity, -5] },
            { color: downs[10], range: [-5, -4.5] },
            { color: downs[9], range: [-4.5, -4] },
            { color: downs[8], range: [-4, -3.5] },
            { color: downs[7], range: [-3.5, -3] },
            { color: downs[6], range: [-3, -2.5] },
            { color: downs[5], range: [-2.5, -2] },
            { color: downs[4], range: [-2, -1.5] },
            { color: downs[3], range: [-1.5, -1] },
            { color: downs[2], range: [-1, -0.5] },
            { color: downs[1], range: [-0.5, -0.125] },
            { color: colors.black, range: [-0.125, 0.125] },
            { color: ups[1], range: [0.125, 0.5] },
            { color: ups[2], range: [0.5, 1] },
            { color: ups[3], range: [1, 1.5] },
            { color: ups[4], range: [1.5, 2] },
            { color: ups[5], range: [2, 2.5] },
            { color: ups[6], range: [2.5, 3] },
            { color: ups[7], range: [3, 3.5] },
            { color: ups[8], range: [3.5, 4] },
            { color: ups[9], range: [4, 4.5] },
            { color: ups[10], range: [4.5, 5] },
            { color: ups[11], range: [5, Infinity] },
          ].find(
            (config) => value >= config.range[0] && value < config.range[1],
          )?.color

        series.setData(
          values.slice(offset).map(({ time, value }, index) => ({
            time,
            value: size,
            color: getColor((value / values[index].value - 1) * 100),
          })),
        )
      })
    })

    return {
      halved: true,
    }
  }
