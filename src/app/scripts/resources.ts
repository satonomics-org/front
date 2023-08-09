import { backEndAPI } from '/src/scripts'

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
    transactedVolume: createDatasetResource(backEndAPI.fetchTransactedVolume),
    sthRealizedPrice: createDatasetResource(backEndAPI.fetchSTHRealizedPrice),
    lthRealizedPrice: createDatasetResource(backEndAPI.fetchLTHRealizedPrice),
    oneMonthRealizedPrice: createDatasetResource(
      backEndAPI.fetch1MRealizedPrice
    ),
    threeMonthsRealizedPrice: createDatasetResource(
      backEndAPI.fetch3MRealizedPrice
    ),
    sixMonthsRealizedPrice: createDatasetResource(
      backEndAPI.fetch6MRealizedPrice
    ),
    oneYearRealizedPrice: createDatasetResource(
      backEndAPI.fetch1YRealizedPrice
    ),
    twoYearsRealizedPrice: createDatasetResource(
      backEndAPI.fetch2YRealizedPrice
    ),
    netRealizedProfitAndLoss: createDatasetResource(
      backEndAPI.fetchNetRealizedProfitAndLoss
    ),
    sopr: createDatasetResource(backEndAPI.fetchSOPR),
    planktonRealizedPrice: createDatasetResource(
      backEndAPI.fetchPlanktonRealizedPrice
    ),
    shrimpsRealizedPrice: createDatasetResource(
      backEndAPI.fetchShrimpsRealizedPrice
    ),
    crabsRealizedPrice: createDatasetResource(
      backEndAPI.fetchCrabsRealizedPrice
    ),
    fishRealizedPrice: createDatasetResource(backEndAPI.fetchFishRealizedPrice),
    sharksRealizedPrice: createDatasetResource(
      backEndAPI.fetchSharksRealizedPrice
    ),
    whalesRealizedPrice: createDatasetResource(
      backEndAPI.fetchWhalesRealizedPrice
    ),
    humpbacksRealizedPrice: createDatasetResource(
      backEndAPI.fetchHumpbacksRealizedPrice
    ),
    planktonBalances: createDatasetResource(backEndAPI.fetchPlanktonBalances),
    shrimpsBalances: createDatasetResource(backEndAPI.fetchShrimpsBalances),
    crabsBalances: createDatasetResource(backEndAPI.fetchCrabsBalances),
    fishBalances: createDatasetResource(backEndAPI.fetchFishBalances),
    sharksBalances: createDatasetResource(backEndAPI.fetchSharksBalances),
    whalesBalances: createDatasetResource(backEndAPI.fetchWhalesBalances),
    humpbacksBalances: createDatasetResource(backEndAPI.fetchHumpbacksBalances),
    planktonDistribution: createDatasetResource(
      backEndAPI.fetchPlanktonDistribution
    ),
    shrimpsDistribution: createDatasetResource(
      backEndAPI.fetchShrimpsDistribution
    ),
    crabsDistribution: createDatasetResource(backEndAPI.fetchCrabsDistribution),
    fishDistribution: createDatasetResource(backEndAPI.fetchFishDistribution),
    sharksDistribution: createDatasetResource(
      backEndAPI.fetchSharksDistribution
    ),
    whalesDistribution: createDatasetResource(
      backEndAPI.fetchWhalesDistribution
    ),
    humpbacksDistribution: createDatasetResource(
      backEndAPI.fetchHumpbacksDistribution
    ),

    terminalPrice: createDatasetResource(backEndAPI.fetchTerminalPrice),
    realizedPrice: createDatasetResource(backEndAPI.fetchRealizedPrice),
    balancedPrice: createDatasetResource(backEndAPI.fetchBalancedPrice),
    cvdd: createDatasetResource(backEndAPI.fetchCVDD),
    fundingRates: createDatasetResource(backEndAPI.fetchFundingRates),
    vddMultiple: createDatasetResource(backEndAPI.fetchVDDMultiple),
    minersRevenue: createDatasetResource(backEndAPI.fetchMinersRevenue),
    supplyInProfit: createDatasetResource(backEndAPI.fetchSupplyInProfit),
    supplyInLoss: createDatasetResource(backEndAPI.fetchSupplyInLoss),
    lthSupply: createDatasetResource(backEndAPI.fetchLTHSupply),
    sthSupply: createDatasetResource(backEndAPI.fetchSTHSupply),
    lthInProfit: createDatasetResource(backEndAPI.fetchLTHInProfit),
    sthInProfit: createDatasetResource(backEndAPI.fetchSTHInProfit),
    lthInLoss: createDatasetResource(backEndAPI.fetchLTHInLoss),
    sthInLoss: createDatasetResource(backEndAPI.fetchSTHInLoss),
    hashrate: createDatasetResource(backEndAPI.fetchHashrate),
  }

  return datasets
}
