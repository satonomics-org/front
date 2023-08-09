import {
  applyMovingAveragesPreset,
  computeYearlyMovingAverage,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets, candlesticks }) => {
  applyMovingAveragesPreset({
    chart,
    dataset: datasets.minersRevenue,
    gradient: 'violet',
    log: true,
    transformer: (datasetValues) => {
      const closes = (candlesticks || []).reduce((obj, candlestick) => {
        obj[candlestick.time] = candlestick.close
        return obj
      }, {} as Record<string, number>)

      const dailyDataset = datasetValues.map((data) => ({
        time: data.time,
        value: data.value * closes[data.time as string],
      }))

      const yearlyDataset = computeYearlyMovingAverage(dailyDataset)

      return dailyDataset.map(({ time, value }, index) => {
        const yearlyValue = yearlyDataset[index].value

        return {
          time,
          value: value / yearlyValue,
        }
      })
    },
  })
}
