type ResourceKey =
  | 'candlesticks'
  | 'sthRealizedPrice'
  | 'lthRealizedPrice'
  | 'oneMonthRealizedPrice'
  | 'threeMonthsRealizedPrice'
  | 'sixMonthsRealizedPrice'
  | 'oneYearRealizedPrice'
  | 'twoYearsRealizedPrice'
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
  | 'cointimePrice'
  | 'trueMeanPrice'
  | 'vaultedPrice'
  | 'fundingRates'
  | 'vddMultiple'
  | 'minersRevenue'
  | 'supplyInProfit'
  | 'supplyInLoss'
  | 'lthSupply'
  | 'sthSupply'
  | 'lthInLoss'
  | 'sthInLoss'
  | 'lthInProfit'
  | 'sthInProfit'
  | 'hashrate'
  | 'stablecoinsMarketCaps'

interface Resources
  extends Record<
    Exclude<ResourceKey, 'candlesticks' | 'stablecoinsMarketCaps'>,
    ResourceHTTP<DatedSingleValueData[]>
  > {
  candlesticks: ResourceHTTP<CandlestickDataWithVolume[]>
  stablecoinsMarketCaps: ResourceHTTP<GroupedSingleValues[]>
  latestCandle: ResourceWS<CandlestickDataWithVolume>
}

interface ResourceHTTP<T = DatedSingleValueData[]> {
  fetch: VoidFunction
  values: ASS<T | null>
  loading: ASS<boolean>
}

interface ResourceWS<T> {
  live: Accessor<boolean>
  latest: Accessor<T | null>
  open: VoidFunction
  close: VoidFunction
}
