import { colors, selfAPI } from '/src/scripts'

import { createLineSeries, resetLeftPriceScale } from '../../app/scripts/chart'

export const createSharksRealizedPriceSeries: CreateSeries = async (
  chart,
  signal
) => {
  resetLeftPriceScale(chart)

  const dataset = await selfAPI.fetchSharksRealizedPrice(signal)

  return [
    createLineSeries({
      chart,
      dataset,
      color: colors.teal,
      autoscale: false,
    }),
  ]
}

export const createWhalesRealizedPriceSeries: CreateSeries = async (
  chart,
  signal
) => {
  resetLeftPriceScale(chart)

  const dataset = await selfAPI.fetchWhalesRealizedPrice(signal)

  return [
    createLineSeries({
      chart,
      dataset,
      color: colors.blue,
      autoscale: false,
    }),
  ]
}

export const createHumpbacksRealizedPriceSeries: CreateSeries = async (
  chart,
  signal
) => {
  resetLeftPriceScale(chart)

  const dataset = await selfAPI.fetchHumpbacksRealizedPrice(signal)

  return [
    createLineSeries({
      chart,
      dataset,
      color: colors.violet,
      autoscale: false,
    }),
  ]
}

export const createEntitiesRealizedPricesSeries: CreateSeries = async (
  chart,
  signal
) => {
  resetLeftPriceScale(chart)

  const sharks = await selfAPI.fetchSharksRealizedPrice(signal)
  const whales = await selfAPI.fetchWhalesRealizedPrice(signal)
  const humpbacks = await selfAPI.fetchHumpbacksRealizedPrice(signal)

  return [
    createLineSeries({
      chart,
      dataset: sharks,
      color: colors.teal,
      autoscale: false,
      title: 'Sharks',
    }),
    createLineSeries({
      chart,
      dataset: whales,
      color: colors.blue,
      autoscale: false,
      title: 'Whales',
    }),
    createLineSeries({
      chart,
      dataset: humpbacks,
      color: colors.violet,
      autoscale: false,
      title: 'Humpbacks',
    }),
  ]
}
