export const resetLeftPriceScale = (
  chart: IChartApi,
  options?: FullPriceScaleOptions,
) =>
  chart.priceScale('left').applyOptions({
    visible: false,
    ...options,
    scaleMargins: {
      top: 0.2,
      bottom: 0.1,
      ...(options?.halved
        ? {
            top: 0.55,
            bottom: 0.05,
          }
        : {}),
      ...options?.scaleMargins,
    },
  })
