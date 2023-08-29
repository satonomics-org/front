export const resetLeftPriceScale = (
  chart: IChartApi,
  options?: DeepPartial<PriceScaleOptions>,
) =>
  chart.priceScale('left').applyOptions({
    visible: false,
    ...options,
    scaleMargins: {
      top: 0.2,
      bottom: 0.1,
      ...options?.scaleMargins,
    },
  })
