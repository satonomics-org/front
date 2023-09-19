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

interface Resources {
  http: ResourcesHTTP
  ws: ResourcesWS
}

interface ResourcesHTTP
  extends Record<
    Exclude<ResourceKey, 'candlesticks' | 'stablecoinsMarketCaps'>,
    ResourceHTTP<DatedSingleValueData[]>
  > {
  candlesticks: ResourceHTTP<
    CandlestickDataWithVolumeWithoutTime[],
    CandlestickDataWithVolume[]
  >
}

interface ResourcesWS {
  latestCandle: ResourceWS<CandlestickDataWithVolume>
}

interface ResourceHTTP<
  T extends Array<any> = DatedSingleValueData[],
  F extends Array<any> = T,
> {
  fetch: VoidFunction
  values: ASS<F | null>
  loading: ASS<boolean>
  url: URL
}

interface ResourceWS<T> {
  live: Accessor<boolean>
  latest: Accessor<T | null>
  open: VoidFunction
  close: VoidFunction
}
