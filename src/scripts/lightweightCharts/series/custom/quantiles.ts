import { colors, createLineSeries, darken } from '/src/scripts'

export const createQuantilesLineSeries = (
  chart: IChartApi,
  params: { left?: true; darkenPercentage?: number },
) => {
  const { left, darkenPercentage } = params

  const createQuantileSeries = (color: string) =>
    createLineSeries(chart, {
      color: darken(color, darkenPercentage),
      priceScaleId: left ? 'left' : undefined,
    })

  return {
    99.9: createQuantileSeries(colors.red[800]),
    99.5: createQuantileSeries(colors.orange[800]),
    99: createQuantileSeries(colors.yellow[800]),
    1: createQuantileSeries(colors.yellow[800]),
    0.5: createQuantileSeries(colors.orange[800]),
    0.1: createQuantileSeries(colors.red[800]),
  }
}
