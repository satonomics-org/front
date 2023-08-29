type DatasetWithAverages<Value extends WhitespaceData = SingleValueData> =
  Dataset<Value> & AveragesAddOn

type AveragesAddOn = {
  averages: Averages<SingleValueData>
}

type Averages<
  Value = SingleValueData,
  Values = Accessor<Value[] | null>,
> = Record<MovingAverageKey, Values>

type AveragesSignals = Record<
  MovingAverageKey,
  Signal<SingleValueData[] | null>
>

type MovingAverageKey = 'weekly' | 'monthly' | 'yearly'
