interface DatasetResource<ValueType = LightweightCharts.SingleValueData> {
  fetch: (signal?: AbortSignal) => Promise<Solid.Accessor<ValueType[] | null>>
  values: Solid.Accessor<ValueType[] | null>
}

interface DatasetsResources {
  transactedVolume: DatasetResource
  sthRealizedPrice: DatasetResource
  lthRealizedPrice: DatasetResource
  twoYearRealizedPrice: DatasetResource
  netRealizedProfitAndLoss: DatasetResource
  sopr: DatasetResource
  planktonRealizedPrice: DatasetResource
  shrimpsRealizedPrice: DatasetResource
  crabsRealizedPrice: DatasetResource
  fishRealizedPrice: DatasetResource
  sharksRealizedPrice: DatasetResource
  whalesRealizedPrice: DatasetResource
  humpbacksRealizedPrice: DatasetResource
  terminalPrice: DatasetResource
  realizedPrice: DatasetResource
  balancedPrice: DatasetResource
  cvdd: DatasetResource
  fundingRates: DatasetResource
  vddMultiple: DatasetResource
}
