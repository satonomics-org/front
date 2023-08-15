type DatasetWithQuantiles = Dataset<LightweightCharts.SingleValueData> &
  QuantilesAddOn

type QuantilesAddOn = {
  quantiles: Quantiles<LightweightCharts.SingleValueData>
}

type Quantiles<
  Value = LightweightCharts.SingleValueData,
  Values = Solid.Accessor<Value[] | null>,
> = Record<QuantileKey, Values>

type QuantileSignals = Record<
  QuantileKey,
  Solid.Signal<LightweightCharts.SingleValueData[] | null>
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
