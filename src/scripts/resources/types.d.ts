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
    ResourceHTTP<DatedSingleValueData>
  > {
  candlesticks: ResourceHTTP<CandlestickDataWithVolume>
  stablecoinsMarketCaps: ResourceHTTP<GroupedSingleValues>
  latestCandle: ResourceWS<CandlestickDataWithVolume>
}

interface ResourceHTTP<Value = DatedSingleValueData, Values = Value[] | null> {
  fetch: (owner: Owner | null) => Promise<void>
  values: ASS<Values>
}

interface ResourceWS<Value> {
  live: Accessor<boolean>
  latest: Accessor<Value | null>
  open: VoidFunction
  close: VoidFunction
}
