interface Dataset<Value = DatedSingleValueData> {
  values: Accessor<Value[] | null>
  fetch: VoidFunction
}

type DatasetKey = keyof Datasets

interface Datasets
  extends Record<
    Exclude<
      ResourceKey,
      | 'candlesticks'
      | 'minersRevenue'
      | 'stablecoinsMarketCaps'
      | 'vddMultiple'
      | 'fundingRates'
    >,
    Dataset<DatedSingleValueData>
  > {
  candlesticks: Dataset<CandlestickDataWithVolume>
  closes: DatasetWithAverages
  closesRecord: {
    values: Accessor<Record<string, number>>
    fetch: VoidFunction
  }
  vddMultiple: Dataset<DatedHistogramData>
  fundingRates: Dataset<DatedHistogramData>
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
  stablecoinsMarketCaps: Dataset<GroupedSingleValues>
  '30DBalanceChanges': GroupedDatasetsByEntityName
  '90DBalanceChanges': GroupedDatasetsByEntityName
}

type GroupedDatasetsByEntityName = GroupedByEntity<
  Dataset<DatedSingleValueData>
>

type GroupedByEntity<T> = Record<EntityName, T>

type EntityName =
  | 'humpbacks'
  | 'whales'
  | 'sharks'
  | 'fish'
  | 'crabs'
  | 'shrimps'
  | 'plankton'
