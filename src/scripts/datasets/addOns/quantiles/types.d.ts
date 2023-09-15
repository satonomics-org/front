type DatasetWithQuantiles = Dataset<DatedSingleValueData> &
  RatiosAddOn &
  QuantilesAddOn

type QuantilesAddOn = {
  quantiles: Quantiles<DatedSingleValueData>
}

type Quantiles<
  Value = DatedSingleValueData,
  Values = Accessor<Value[] | null>,
> = Record<QuantileKey, Values>

type QuantileSignals = Record<
  QuantileKey,
  Signal<DatedSingleValueData[] | null>
>

type QuantileKey =
  | 0.1
  | 0.5
  | 1
  | 2.5
  | 5
  | 10
  | 25
  | 50
  | 75
  | 90
  | 95
  | 97.5
  | 99
  | 99.5
  | 99.9
