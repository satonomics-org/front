import { darken as _darken, colors, createLineSeries } from '/src/scripts'

export const createQuantilesLineSeries = (
  chart: IChartApi,
  options: { left?: true; darken?: boolean } & DeepPartialLineOptions = {},
) => {
  const { left, darken } = options

  const createQuantileSeries = (color: string) =>
    createLineSeries(chart, {
      ...options,
      color: darken ? _darken(color, 0.6) : _darken(color, 0.4),
      priceScaleId: left ? 'left' : undefined,
    })

  return {
    99.9: createQuantileSeries(colors.red[500]),
    99.5: createQuantileSeries(colors.orange[500]),
    99: createQuantileSeries(colors.yellow[500]),
    1: createQuantileSeries(colors.yellow[500]),
    0.5: createQuantileSeries(colors.orange[500]),
    0.1: createQuantileSeries(colors.red[500]),
  }
}
