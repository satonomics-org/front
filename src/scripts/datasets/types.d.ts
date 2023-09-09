interface Dataset<Value extends WhitespaceData = SingleValueData> {
  values: Accessor<Value[] | null>
  fetch: () => void
}

type DatasetKey = keyof Datasets

interface Datasets
  extends Record<
    Exclude<ResourceKey, 'candlesticks' | 'minersRevenue'>,
    Dataset<SingleValueData>
  > {
  candlesticks: Dataset<CandlestickDataWithVolume>
  weeklyMA: DatasetWithQuantiles
  monthlyMA: DatasetWithQuantiles
  yearlyMA: DatasetWithQuantiles
  sthRealizedPrice: DatasetWithQuantiles
  lthRealizedPrice: DatasetWithQuantiles
  oneMonthRealizedPrice: DatasetWithQuantiles
  threeMonthsRealizedPrice: DatasetWithQuantiles
  sixMonthsRealizedPrice: DatasetWithQuantiles
  oneYearRealizedPrice: DatasetWithQuantiles
  twoYearsRealizedPrice: DatasetWithQuantiles
  planktonRealizedPrice: DatasetWithQuantiles
  shrimpsRealizedPrice: DatasetWithQuantiles
  crabsRealizedPrice: DatasetWithQuantiles
  fishRealizedPrice: DatasetWithQuantiles
  sharksRealizedPrice: DatasetWithQuantiles
  whalesRealizedPrice: DatasetWithQuantiles
  humpbacksRealizedPrice: DatasetWithQuantiles
  terminalPrice: DatasetWithQuantiles
  realizedPrice: DatasetWithQuantiles
  balancedPrice: DatasetWithQuantiles
  cvdd: DatasetWithQuantiles
  cointimePrice: DatasetWithQuantiles
  trueMeanPrice: DatasetWithQuantiles
  vaultedPrice: DatasetWithQuantiles
  minersRevenueInBitcoin: DatasetWithAverages
  minersRevenueInDollars: DatasetWithAverages
  puellMultiple: DatasetWithAverages
  hashrate: DatasetWithAverages
}
