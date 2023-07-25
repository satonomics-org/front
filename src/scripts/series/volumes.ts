import { colors, movingAverage, selfAPI } from '/src/scripts'

import {
  createHistogramSeries,
  createLineSeries,
  resetLeftPriceScale,
} from '../../app/scripts/chart'

export const createMarketVolumeSeries: CreateSeries = async (
  chart,
  _,
  candlesticks
) => {
  resetLeftPriceScale(chart, {
    visible: true,
    scaleMargins: {
      top: 0.8,
      bottom: 0,
    },
  })

  const dataset = (candlesticks || []).map((candle) => {
    const color = `${candle.close > candle.open ? colors.green : colors.red}88`

    return {
      time: candle.time,
      value: candle.volume,
      color,
    }
  })

  return [
    createHistogramSeries({
      chart,
      dataset,
    }),
    createLineSeries({
      chart,
      dataset: movingAverage(dataset, 30).map((data) => ({
        time: data.time,
        value: data.value,
      })),
      color: `${colors.white}88`,
      options: {
        priceScaleId: 'left',
      },
    }),
  ]
}

export const createOnChainVolumeSeries: CreateSeries = async (
  chart,
  signal,
  candlesticks
) => {
  resetLeftPriceScale(chart, {
    visible: true,
    scaleMargins: {
      top: 0.8,
      bottom: 0,
    },
  })

  const onChainVolume = await selfAPI.fetchTransactedVolume(signal)

  const dataset = (candlesticks || []).map((candle, index) => {
    const color = `${candle.close > candle.open ? colors.green : colors.red}bb`

    return {
      time: candle.time,
      value: onChainVolume[index].value,
      color,
    }
  })

  return [
    createHistogramSeries({
      chart,
      dataset,
    }),
    createLineSeries({
      chart,
      dataset: movingAverage(dataset, 30).map((data) => ({
        time: data.time,
        value: data.value,
      })),
      color: `${colors.white}88`,
      options: {
        priceScaleId: 'left',
      },
    }),
  ]
}
