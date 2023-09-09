let autoScaleInfo: AutoscaleInfo | null = null

export const createAutoscaleInfoProvider =
  (override: boolean = false): AutoscaleInfoProvider =>
  (getInfo) => {
    if (override) {
      autoScaleInfo = getInfo()
    }

    return autoScaleInfo || getInfo()
  }
