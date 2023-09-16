type DatasetWithQuantiles = Dataset<DatedSingleValueData[]> &
  RatiosAddOn &
  QuantilesAddOn

type QuantilesAddOn = {
  quantiles: Quantiles
}

type Quantiles<T = DatedSingleValueData[]> = Record<
  QuantileKey,
  Accessor<T | null>
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

type ExtremeQuantileKey = Exclude<
  QuantileKey,
  2.5 | 5 | 10 | 25 | 50 | 75 | 90 | 95 | 97.5
>

type ExtremeQuantiles<T = DatedSingleValueData[]> = Record<
  ExtremeQuantileKey,
  Accessor<T | null>
>
