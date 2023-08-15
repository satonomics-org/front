import { PriceScaleMode } from 'lightweight-charts'

import {
  assignedColors,
  colors,
  createHistogramSeries,
  resetLeftPriceScale,
} from '/src/scripts'

const INDEX_OFFSET = 30

export const percentageAutoscaleInfoProvider: LightweightCharts.AutoscaleInfoProvider =
  () => ({
    priceRange: {
      minValue: 0.01,
      maxValue: 1_000_000,
    },
  })

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
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
    const series = createHistogramSeries({
      chart,
      title,
      options: {
        priceScaleId: 'left',
        autoscaleInfoProvider: percentageAutoscaleInfoProvider,
      },
    })

    dataset.fetch()

    createEffect(() => {
      const values = dataset.values() || []

      const getColor = (value: number) =>
        [
          { color: colors.blue800, range: [-Infinity, -3] },
          { color: colors.blue700, range: [-3, -2.5] },
          { color: colors.blue600, range: [-2.5, -2] },
          { color: colors.blue500, range: [-2, -1.5] },
          { color: colors.blue400, range: [-1.5, -1] },
          { color: colors.blue300, range: [-1, -0.5] },
          { color: colors.blue200, range: [-0.5, -0.125] },
          { color: colors.white, range: [-0.125, 0.125] },
          { color: colors.red200, range: [0.125, 0.5] },
          { color: colors.red300, range: [0.5, 1] },
          { color: colors.red400, range: [1, 1.5] },
          { color: colors.red500, range: [1.5, 2] },
          { color: colors.red600, range: [2, 2.5] },
          { color: colors.red700, range: [2.5, 3] },
          { color: colors.red800, range: [3, Infinity] },
        ].find((config) => value >= config.range[0] && value < config.range[1])
          ?.color

      series.setData(
        values.slice(INDEX_OFFSET).map(({ time, value }, index) => ({
          time,
          value: size,
          color: getColor((value / values[index].value - 1) * 100),
        })),
      )
    })
  })
}
