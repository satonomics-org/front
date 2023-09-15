let mainGetInfo: (() => AutoscaleInfo | null) | null = null

export const createAutoscaleInfoProvider =
  (override: boolean = false): AutoscaleInfoProvider =>
  (getInfo) => {
    if (override) {
      mainGetInfo = getInfo
    }

    return (mainGetInfo || getInfo)()
  }
