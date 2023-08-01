interface DatasetResource<ValueType = LightweightCharts.SingleValueData> {
  fetch: (signal?: AbortSignal) => Promise<Solid.Accessor<ValueType[] | null>>
  values: Solid.Accessor<ValueType[] | null>
}

type DatasetsResourcesKey =
  | 'transactedVolume'
  | 'sthRealizedPrice'
  | 'lthRealizedPrice'
  | 'twoYearRealizedPrice'
  | 'netRealizedProfitAndLoss'
  | 'sopr'
  | 'planktonRealizedPrice'
  | 'shrimpsRealizedPrice'
  | 'crabsRealizedPrice'
  | 'fishRealizedPrice'
  | 'sharksRealizedPrice'
  | 'whalesRealizedPrice'
  | 'humpbacksRealizedPrice'
  | 'planktonBalances'
  | 'shrimpsBalances'
  | 'crabsBalances'
  | 'fishBalances'
  | 'sharksBalances'
  | 'whalesBalances'
  | 'humpbacksBalances'
  | 'planktonDistribution'
  | 'shrimpsDistribution'
  | 'crabsDistribution'
  | 'fishDistribution'
  | 'sharksDistribution'
  | 'whalesDistribution'
  | 'humpbacksDistribution'
  | 'terminalPrice'
  | 'realizedPrice'
  | 'balancedPrice'
  | 'cvdd'
  | 'fundingRates'
  | 'vddMultiple'
  | 'minersRevenue'
  | 'supplyInProfit'
  | 'supplyInLoss'

type DatasetsResources = Record<DatasetsResourcesKey, DatasetResource>