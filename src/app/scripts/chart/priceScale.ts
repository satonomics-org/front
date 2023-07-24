export const resetLeftPriceScale = (
  chart: LightweightCharts.IChartApi,
  options?: LightweightCharts.DeepPartial<LightweightCharts.PriceScaleOptions>
) =>
  chart.priceScale('left').applyOptions({
    visible: false,
    scaleMargins: {
      top: 0.2,
      bottom: 0.1,
    },
    ...options,
  })
