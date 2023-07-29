import { selfAPI } from '/src/scripts'

const TEN_MINUTES_IN_MS = 600_000

const createDatasetResource = <ValueType = LightweightCharts.SingleValueData>(
  fetch: (signal?: AbortSignal) => Promise<ValueType[]>
) => {
  const [values, setValues] = createSignal(null as ValueType[] | null)

  let lastSuccessfulPull: Date | null

  const dataset: DatasetResource<ValueType> = {
    fetch: async (signal?: AbortSignal) => {
      if (
        !lastSuccessfulPull ||
        new Date().valueOf() - lastSuccessfulPull.valueOf() > TEN_MINUTES_IN_MS
      ) {
        const values = await fetch(signal)

        if (Array.isArray(values)) {
          lastSuccessfulPull = new Date()

          setValues(values)
        }
      }

      return dataset.values
    },
    values,
  }

  return dataset
}

export const createDatasetsResources = () => {
  const datasets: DatasetsResources = {
    transactedVolume: createDatasetResource(selfAPI.fetchTransactedVolume),
    sthRealizedPrice: createDatasetResource(selfAPI.fetchSTHRealizedPrice),
    lthRealizedPrice: createDatasetResource(selfAPI.fetchLTHRealizedPrice),
    twoYearRealizedPrice: createDatasetResource(selfAPI.fetch2YRealizedPrice),
    netRealizedProfitAndLoss: createDatasetResource(
      selfAPI.fetchNetRealizedProfitAndLoss
    ),
    sopr: createDatasetResource(selfAPI.fetchSOPR),
    planktonRealizedPrice: createDatasetResource(
      selfAPI.fetchPlanktonRealizedPrice
    ),
    shrimpsRealizedPrice: createDatasetResource(
      selfAPI.fetchShrimpsRealizedPrice
    ),
    crabsRealizedPrice: createDatasetResource(selfAPI.fetchCrabsRealizedPrice),
    fishRealizedPrice: createDatasetResource(selfAPI.fetchFishRealizedPrice),
    sharksRealizedPrice: createDatasetResource(
      selfAPI.fetchSharksRealizedPrice
    ),
    whalesRealizedPrice: createDatasetResource(
      selfAPI.fetchWhalesRealizedPrice
    ),
    humpbacksRealizedPrice: createDatasetResource(
      selfAPI.fetchHumpbacksRealizedPrice
    ),

    terminalPrice: createDatasetResource(selfAPI.fetchTerminalPrice),
    realizedPrice: createDatasetResource(selfAPI.fetchRealizedPrice),
    balancedPrice: createDatasetResource(selfAPI.fetchBalancedPrice),
    cvdd: createDatasetResource(selfAPI.fetchCVDD),
    fundingRates: createDatasetResource(selfAPI.fetchFundingRates),
    vddMultiple: createDatasetResource(selfAPI.fetchVDDMultiple),
  }

  return datasets
}
