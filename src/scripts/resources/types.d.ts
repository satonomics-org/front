interface Resource<
  Value extends
    LightweightCharts.WhitespaceData = LightweightCharts.SingleValueData,
  Values = Value[] | null,
> {
  fetch: () => void
  values: Solid.Accessor<Values>
  setValues: Solid.Setter<Values>
  live: Solid.Accessor<boolean>
  setLive: Solid.Setter<boolean>
}

type ResourceKey =
  | 'candlesticks'
  | 'transactedVolume'
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

interface Resources
  extends Record<
    Exclude<ResourceKey, 'candlesticks'>,
    Resource<LightweightCharts.SingleValueData>
  > {
  candlesticks: CandlesticksResource
}

type CandlesticksResource = Resource<CandlestickDataWithVolume>
