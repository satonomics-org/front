import { colors, createLineSeries, roundValue } from '/src/scripts'

export const createQuantilesLineSeries = (
  chart: LightweightCharts.IChartApi,
  left?: true,
): Record<QuantileKey, LightweightCharts.ISeriesApi<'Line'>> => {
  const createQuantileSeries = (value: number, color: string) =>
    createLineSeries({
      chart,
      color: `${color}88`,
      title: `${Math.min(roundValue(100 - value, 1), value)}%`,
      options: {
        priceScaleId: left ? 'left' : undefined,
      },
    })

  const tuples: Record<QuantileKey, string> = {
    99.9: colors.violet,
    99.5: colors.fuchsia,
    99: colors.pink,
    97.5: colors.red,
    95: colors.orange,
    90: colors.yellow,
    75: colors.lime,
    50: colors.emerald,
    25: colors.lime,
    10: colors.yellow,
    5: colors.orange,
    2.5: colors.red,
    1: colors.pink,
    0.5: colors.fuchsia,
    0.1: colors.violet,
  }

  const seriesList: any = {}

  Object.entries(tuples).forEach(([value, color]) => {
    seriesList[value] = createQuantileSeries(Number(value), color)
  })

  return seriesList
}
