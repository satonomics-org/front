let autoScaleInfo: LightweightCharts.AutoscaleInfo | null = null

export const createAutoscaleInfoProvider =
  (override: boolean = false): LightweightCharts.AutoscaleInfoProvider =>
  (getInfo) => {
    if (override) {
      autoScaleInfo = getInfo()
    }

    return autoScaleInfo || getInfo()
  }

export const percentageAutoscaleInfoProvider: LightweightCharts.AutoscaleInfoProvider =
  () => ({
    priceRange: {
      minValue: 0,
      maxValue: 100,
    },
  })
