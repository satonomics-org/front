type DatasetWithQuantiles = Dataset<SingleValueData> &
  RatiosAddOn &
  QuantilesAddOn

type QuantilesAddOn = {
  quantiles: Quantiles<SingleValueData>
}

type Quantiles<
  Value = SingleValueData,
  Values = Accessor<Value[] | null>,
> = Record<QuantileKey, Values>

type QuantileSignals = Record<QuantileKey, Signal<SingleValueData[] | null>>

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
