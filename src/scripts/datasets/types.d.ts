interface Dataset<
  Value extends
    LightweightCharts.WhitespaceData = LightweightCharts.SingleValueData,
> {
  values: Solid.Accessor<Value[] | null>
  fetch: () => void
}

type DatasetKey = keyof Datasets

interface Datasets
  extends Record<
    Exclude<ResourceKey, 'candlesticks' | 'minersRevenue'>,
    Dataset<LightweightCharts.SingleValueData>
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

  minersRevenueInBitcoin: DatasetWithAverages
  minersRevenueInDollars: DatasetWithAverages
  puellMultiple: DatasetWithAverages
  hashrate: DatasetWithAverages
}
