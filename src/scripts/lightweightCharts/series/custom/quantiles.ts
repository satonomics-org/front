import { colors, createLineSeries } from '/src/scripts'

export const createQuantilesLineSeries = (
  chart: IChartApi,
  params: { left?: true; transparency?: string },
) => {
  const { left, transparency } = params

  const createQuantileSeries = (color: string) =>
    createLineSeries(chart, {
      color: `${color}${transparency || 66}`,
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
