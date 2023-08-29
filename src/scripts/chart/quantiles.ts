import { colors, createLineSeries, roundValue } from '/src/scripts'

export const createQuantilesLineSeries = (
  chart: IChartApi,
  left?: true,
): Record<QuantileKey, ISeriesApi<'Line'>> => {
  const createQuantileSeries = (value: number, color: string) =>
    createLineSeries(chart, {
      color: `${color}88`,
      title: `${Math.min(roundValue(100 - value, 1), value)}%`,
      priceScaleId: left ? 'left' : undefined,
    })

  const tuples: Record<QuantileKey, string> = {
    99.9: colors.violet[500],
    99.5: colors.fuchsia[500],
    99: colors.pink[500],
    97.5: colors.red[500],
    95: colors.orange[500],
    90: colors.yellow[500],
    75: colors.lime[500],
    50: colors.emerald[500],
    25: colors.lime[500],
    10: colors.yellow[500],
    5: colors.orange[500],
    2.5: colors.red[500],
    1: colors.pink[500],
    0.5: colors.fuchsia[500],
    0.1: colors.violet[500],
  }

  const seriesList: any = {}

  Object.entries(tuples).forEach(([value, color]) => {
    seriesList[value] = createQuantileSeries(Number(value), color)
  })

  return seriesList
}
