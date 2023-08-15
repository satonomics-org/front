type DatasetWithAverages<
  Value extends
    LightweightCharts.WhitespaceData = LightweightCharts.SingleValueData,
> = Dataset<Value> & AveragesAddOn

type AveragesAddOn = {
  averages: Averages<LightweightCharts.SingleValueData>
}

type Averages<
  Value = LightweightCharts.SingleValueData,
  Values = Solid.Accessor<Value[] | null>,
> = Record<MovingAverageKey, Values>

type AveragesSignals = Record<
  MovingAverageKey,
  Solid.Signal<LightweightCharts.SingleValueData[] | null>
>

type MovingAverageKey = 'weekly' | 'monthly' | 'yearly'
