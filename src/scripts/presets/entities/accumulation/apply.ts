import { PriceScaleMode } from 'lightweight-charts'

import {
  colors,
  createHistogramSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const percentageAutoscaleInfoProvider: AutoscaleInfoProvider = () => ({
  priceRange: {
    minValue: 0.01,
    maxValue: 1_000_000,
  },
})

export const generateApplyPreset =
  (offset: number): ApplyPreset =>
  ({ chart, datasets }) => {
    resetLeftPriceScale(chart, {
      mode: PriceScaleMode.Logarithmic,
      scaleMargins: {
        top: 0.5,
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

        const getColor = (value: number) =>
          [
            { color: colors.red[950], range: [-Infinity, -5] },
            { color: colors.red[900], range: [-5, -4.5] },
            { color: colors.red[800], range: [-4.5, -4] },
            { color: colors.red[700], range: [-4, -3.5] },
            { color: colors.red[600], range: [-3.5, -3] },
            { color: colors.red[500], range: [-3, -2.5] },
            { color: colors.red[400], range: [-2.5, -2] },
            { color: colors.red[300], range: [-2, -1.5] },
            { color: colors.red[200], range: [-1.5, -1] },
            { color: colors.red[100], range: [-1, -0.5] },
            { color: colors.red[50], range: [-0.5, 0] },
            { color: colors.green[50], range: [0, 0.5] },
            { color: colors.green[100], range: [0.5, 1] },
            { color: colors.green[200], range: [1, 1.5] },
            { color: colors.green[300], range: [1.5, 2] },
            { color: colors.green[400], range: [2, 2.5] },
            { color: colors.green[500], range: [2.5, 3] },
            { color: colors.green[600], range: [3, 3.5] },
            { color: colors.green[700], range: [3.5, 4] },
            { color: colors.green[800], range: [4, 4.5] },
            { color: colors.green[900], range: [4.5, 5] },
            { color: colors.green[950], range: [5, Infinity] },
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
  }
